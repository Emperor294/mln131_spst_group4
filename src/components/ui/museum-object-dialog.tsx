'use client';

import Dialog from './dialog';
import { getArtifactByMeshName } from '@/data/course';

interface MuseumObjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  objectName: string;
}

export default function MuseumObjectDialog({ isOpen, onClose, objectName }: MuseumObjectDialogProps) {
  const artifact = getArtifactByMeshName(objectName);
  const info = artifact || {
    title: objectName,
    description: "Thông tin về đối tượng này đang được cập nhật.",
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={info.title}>
      <div className="space-y-4">
        {artifact?.status === 'draft' && (
          <p className="text-sm font-medium text-amber-800">
            Nội dung nháp – cần rà soát với giáo trình MLN131 chính thức.
          </p>
        )}
        {artifact?.image && (
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={artifact.image.src}
              alt={artifact.image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-gray-500">Hình ảnh: ${info.title}</span></div>`;
                }
              }}
            />
          </div>
        )}
        <p className="text-gray-700 leading-relaxed">
          {info.description}
        </p>
        
        {artifact?.learningConnection && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Liên hệ với bài học:</h4>
            <p className="text-blue-700 leading-relaxed text-sm">
              {artifact.learningConnection}
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
}
