import { Schema, model, models } from 'mongoose';

const propertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  region: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export const Property = models.Property || model('Property', propertySchema);