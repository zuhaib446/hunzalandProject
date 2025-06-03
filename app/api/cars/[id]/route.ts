import { NextResponse } from 'next/server';
import { Car } from '@/lib/models/car';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDB();

    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

