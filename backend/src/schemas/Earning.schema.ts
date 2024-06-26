import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { EarningSource } from './EarningSource.schema';
import { User } from './User.schema';

export type IncomeDocument = HydratedDocument<Earning>;

@Schema()
export class Earning {
  @Prop({ type: String, required: false })
  earning_description: string;

  @Prop({ type: Number, required: true })
  earning_amount: number;

  @Prop({ type: Date, required: true, default: Date.now })
  earning_date: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: EarningSource.name })
  id_earning_source: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  id_user: Types.ObjectId;
}

export const EarningSchema = SchemaFactory.createForClass(Earning);

EarningSchema.pre("findOneAndUpdate", function(next){
  const earnings = this.getUpdate()

  Object.keys(earnings).forEach((key)=>{
    if(typeof(earnings[key])==="string"){
      earnings[key] = earnings[key].trim()
    }
  })
  next()
})

EarningSchema.pre("save", function(next){
  this.earning_description = this.earning_description.trim()

  next()
})