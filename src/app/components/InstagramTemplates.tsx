import { SessionThumbnail } from './SessionThumbnail';
import { SpeakerIntroduction } from './SpeakerIntroduction';
import { ActivityGallery } from './ActivityGallery';
import { StudyIntroduction } from './StudyIntroduction';

export function InstagramTemplates() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-['Montserrat'] text-4xl font-bold text-gray-900">
            GDGoC DEU Instagram Feed Templates
          </h1>
          <p className="font-['Pretendard'] text-lg text-gray-600">
            인스타그램 피드 템플릿 (600x800 px)
          </p>
        </div>

        <div className="space-y-16">
          {/* Template 1: Session Thumbnail */}
          <div>
            <h2 className="mb-6 text-center font-['Pretendard'] text-2xl font-bold text-gray-800">
              Template 1: Session Thumbnail
            </h2>
            <div className="flex justify-center">
              <SessionThumbnail sessionTitle="Session Name" />
            </div>
          </div>

          {/* Template 2: Study Introduction */}
          <div>
            <h2 className="mb-6 text-center font-['Pretendard'] text-2xl font-bold text-gray-800">
              Template 2: Study Introduction
            </h2>
            <div className="flex justify-center">
              <StudyIntroduction 
                studyName="Android 개발 스터디"
                studyDescription="Kotlin과 Jetpack Compose를 활용한 모던 Android 앱 개발을 배우고, 실제 프로젝트를 통해 협업 능력을 키워나가는 스터디입니다."
                recruitmentPeriod="2026. 02. 24 ~ 2026. 03. 07"
              />
            </div>
          </div>

          {/* Template 3: Speaker Introduction */}
          <div>
            <h2 className="mb-6 text-center font-['Pretendard'] text-2xl font-bold text-gray-800">
              Template 3: Speaker Introduction
            </h2>
            <div className="flex justify-center">
              <SpeakerIntroduction 
                speakerName="김철수"
                presentationTitle="Google Cloud Platform 실전 활용"
                description="실무에서 활용하는 GCP 서비스들과 클라우드 아키텍처 설계 방법에 대해 배워봅니다. Firebase, Cloud Functions, Cloud Run 등 다양한 서비스를 다룹니다."
              />
            </div>
          </div>

          {/* Template 4: Activity Gallery */}
          <div>
            <h2 className="mb-6 text-center font-['Pretendard'] text-2xl font-bold text-gray-800">
              Template 4: Activity Gallery
            </h2>
            <div className="flex justify-center">
              <ActivityGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}