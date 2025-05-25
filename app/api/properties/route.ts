import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Property } from '@/lib/models/property';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
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
    const property = new Property(data);
    await property.save();
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
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
    const property = await Property.findByIdAndUpdate(id, {
      ...data,
      updatedAt: new Date()
    }, { new: true });
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
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
    await Property.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}