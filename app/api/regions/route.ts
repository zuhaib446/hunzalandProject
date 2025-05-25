import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Region } from '@/lib/models/region';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    const regions = await Region.find({}).sort({ createdAt: -1 });
    return NextResponse.json(regions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
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
    const region = new Region(data);
    await region.save();
    
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 });
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
    const region = await Region.findByIdAndUpdate(id, {
      ...data,
      updatedAt: new Date()
    }, { new: true });
    
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update region' }, { status: 500 });
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
    await Region.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete region' }, { status: 500 });
  }
}