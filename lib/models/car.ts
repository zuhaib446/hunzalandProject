import { Schema, model, models } from 'mongoose';

const carSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  withDriver: {
    type: Boolean,
    default: true,
  },
  fuelIncluded: {
    type: Boolean,
    default: false,
  },
  images: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export const Car = models.Car || model('Car', carSchema);