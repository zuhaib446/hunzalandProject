import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Car } from '@/lib/models/car';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find({}).sort({ createdAt: -1 });
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const car = new Car(data);
    await car.save();
    
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id, ...data } = await request.json();
    const car = await Car.findByIdAndUpdate(id, {
      ...data,
      updatedAt: new Date()
    }, { new: true });
    
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await request.json();
    await Car.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}