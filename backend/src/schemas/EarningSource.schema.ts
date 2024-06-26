import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, Types, mongo } from 'mongoose';
import { User } from './User.schema';
import { Earning, EarningSchema } from './Earning.schema';

export type EarningSourceDocument = HydratedDocument<EarningSource>;

@Schema()
export class EarningSource {
  @Prop({ type: String, required: true, unique: true })
  earning_source_name: string;

  @Prop({ enum: ['Fixed', 'Variable'], default: "Variable",required: true })
  earning_type: 'Fixed' | 'Variable';

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  id_user: Types.ObjectId;
}

export const EarningSourceSchema = SchemaFactory.createForClass(EarningSource);

EarningSourceSchema.pre("findOneAndUpdate", function(next){
  const earningSources = this.getUpdate()

  Object.keys(earningSources).forEach((key)=>{
    if(typeof(earningSources[key]) === "string"){
      earningSources[key] = earningSources[key].trim()
    }
  })

  next()
})

EarningSourceSchema.pre("save", function(next){
  this.earning_source_name = this.earning_source_name.trim()

  next()
})