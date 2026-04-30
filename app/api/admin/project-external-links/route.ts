import { NextRequest, NextResponse } from 'next/server';
import mysqlProvider from '@/providers/mysqlProvider';

const provider = mysqlProvider('project_external_links');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (projectId) {
      const links = await provider.fetchData();
      const projectLinks = (links as any[]).filter(link => link.project_id === Number(projectId));
      return NextResponse.json(projectLinks);
    }
    
    const links = await provider.fetchData();
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching project external links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project external links' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await provider.createItem(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating project external link:', error);
    return NextResponse.json(
      { error: 'Failed to create project external link' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID parameter' },
        { status: 400 }
      );
    }
    
    await provider.deleteItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project external link:', error);
    return NextResponse.json(
      { error: 'Failed to delete project external link' },
      { status: 500 }
    );
  }
}
