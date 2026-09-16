import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SITE_CONFIG } from '@/config/site';

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Extract error message helper
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message;
  return 'Unknown error occurred';
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    const apiKey = process.env.GEMINI_API_KEY || '';
    
    if (!apiKey) {
      return NextResponse.json({ 
        response: { 
          content: "Gemini API key is not configured.",
          role: "assistant"
        } 
      }, { status: 200 });
    }
    
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const systemPrompt = `Bạn là trợ lý học tập cho môn ${SITE_CONFIG.academicTitle}.
Trả lời ngắn gọn, cân bằng và bằng tiếng Việt. Chỉ trả lời câu hỏi liên quan đến môn học này.
Nguồn nội dung giáo trình chính thức của hệ thống đang được bổ sung. Không được bịa, suy đoán hoặc tự nhận một nội dung là trích dẫn chính thức của giáo trình. Không được tạo nguồn, số trang hoặc câu trích dẫn không có căn cứ.
Khi người dùng yêu cầu nội dung chính xác theo giáo trình nhưng chưa có dữ liệu đã xác minh, hãy nói rõ: "[Nội dung giáo trình sẽ được bổ sung]" và đề nghị người dùng đối chiếu tài liệu chính thức do giảng viên cung cấp.
Nếu câu hỏi nằm ngoài phạm vi MLN131, hãy từ chối lịch sự và mời người dùng đặt câu hỏi về Chủ nghĩa Xã hội Khoa học.`;

      const fullMessage = `${systemPrompt}\n\nNgười dùng hỏi: ${message}`;
      
      const result = await model.generateContent(fullMessage);
      const response = await result.response;
      const text = response.text();
      
      return NextResponse.json({ 
        response: { 
          content: text,
          role: "assistant"
        } 
      });
    } catch (error: unknown) {
      console.error('Gemini API error:', error);
      
      return NextResponse.json({ 
        response: { 
          content: `Error with Gemini AI service: ${getErrorMessage(error)}`,
          role: "assistant"
        } 
      }, { status: 200 });
    }
    
  } catch (error: unknown) {
    return NextResponse.json(
      { error: `Failed to process request: ${getErrorMessage(error)}` },
      { status: 500 }
    );
  }
}
