import mongoose from "mongoose";

const PropertiesSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
  },
  owners: {
    type: [String],
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  BhkType: {
    type: String,
  },
  noOfTokens: {
    type: Number,
    default: 0,
  },
  purpose: {
    type: String,
  },
  totalImages: {
    type: Number,
  },
  description: {
    type: String,
  },
  metadataUri: {
    type: String,
  },
  priceOf1Token: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
  },
  amenities: {
    type: [String],
  },
  noOfBedrooms: {
    type: Number,
  },
  noOfBathrooms: {
    type: Number,
  },
  latitude:{
    type: Number,
  },
  longitude:{
    type: Number,
  },
});

// Define a virtual property for 'price'
PropertiesSchema.virtual("price").get(function () {
  return this.noOfTokens * this.priceOf1Token;
});

// Ensure virtual fields are included when calling `toJSON()`
PropertiesSchema.set("toJSON", { virtuals: true });

export const Properties = mongoose.models.Properties || mongoose.model("Properties", PropertiesSchema);
