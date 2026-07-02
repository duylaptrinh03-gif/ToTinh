"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useConfetti } from "@/hooks/useConfetti";
import { LandingPage } from "@/components/LandingPage/LandingPage";
import { Timeline } from "@/components/Timeline/Timeline";
import { Gallery } from "@/components/Gallery/Gallery";
import { FunnyMoments } from "@/components/FunnyMoments/FunnyMoments";
import { LoveCounter } from "@/components/LoveCounter/LoveCounter";
import { LoveMessages } from "@/components/LoveMessages/LoveMessages";
import { ProposalSection } from "@/components/ProposalSection/ProposalSection";
import { EndingScreen } from "@/components/EndingScreen/EndingScreen";
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { FloatingHearts } from "@/components/Shared/FloatingHearts";
import { VideoSection } from "@/components/VideoSection/VideoSection";

export default function Home() {
  const { data, getCustomKey, setCustomKey } = useLocalStorage();
  const { triggerConfetti } = useConfetti();
  
  const [hasOpened, setHasOpened] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  
  // Easter Eggs State
  const [typedKeys, setTypedKeys] = useState("");
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    // Wrap in a setTimeout to make it asynchronous and avoid React's synchronous setState warning
    const timer = setTimeout(() => {
      if (getCustomKey("has_opened") === "true") {
        setHasOpened(true);
      }
      if (getCustomKey("has_accepted") === "true") {
        setHasAccepted(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [getCustomKey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Key 'H'
      if (e.key.toLowerCase() === 'h') {
        alert("Anh thích em nhiều lắm ❤️");
      }
      
      // Easter egg "LOVE"
      setTypedKeys(prev => {
        const next = (prev + e.key).slice(-4).toLowerCase();
        if (next === "love") {
          triggerConfetti();
          return "";
        }
        return next;
      });
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerConfetti]);

  if (!data) {
    return <div className="h-screen flex items-center justify-center text-pink-500">Đang chuẩn bị điều bất ngờ...</div>;
  }

  const handleOpen = () => {
    setHasOpened(true);
    setCustomKey("has_opened", "true");
  };

  const handleAccept = () => {
    setHasAccepted(true);
    setCustomKey("has_accepted", "true");
    triggerConfetti();
  };

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      setShowSecret(true);
      setLogoClicks(0); // reset
    }
  };

  // 1. Initial State: Landing Page
  if (!hasOpened) {
    return <LandingPage onOpen={handleOpen} />;
  }

  // 2. Final State: Ending Screen
  if (hasAccepted) {
    return (
      <>
        <MusicPlayer />
        <EndingScreen onHug={() => alert(`Yêu ${data.profile.herName} nhất trên đời! ❤️`)} />
      </>
    );
  }

  // 3. Main Content Journey
  return (
    <main className="relative bg-pink-50 min-h-screen overflow-x-hidden">
      <MusicPlayer />
      
      {/* Secret popup trigger area (Invisible header/logo) */}
      <div 
        onClick={handleLogoClick}
        className="absolute top-0 left-0 w-full h-16 z-50 opacity-0 cursor-pointer"
        title="Nhấn 5 lần để xem bí mật"
      ></div>

      {showSecret && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setShowSecret(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center">
            <h2 className="text-3xl font-dancing-script text-pink-600 mb-4">Bí mật nhỏ 🤫</h2>
            <p className="text-gray-700">Cảm ơn em vì đã tìm ra dòng tin nhắn này. Anh chỉ muốn nói là... Anh yêu em nhiều hơn cả những gì trang web này có thể diễn tả. ❤️</p>
          </div>
        </div>
      )}

      {/* Intro Section with floating hearts */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-50">
        <FloatingHearts />
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-dancing-script text-pink-600 mb-6 drop-shadow-sm">
            Gửi {data.profile.herName}...
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-serif">
            Hôm nay là một ngày đặc biệt, và anh có vài điều muốn nói với em.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 bg-white">
        <Timeline memories={data.memories} />
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 bg-pink-50">
        <Gallery images={data.gallery} />
      </section>

      {/* Funny Moments Section */}
      <section className="relative z-10 bg-white">
        <FunnyMoments moments={data.funnyMoments} />
      </section>

      {/* Video Section */}
      <section className="relative z-10 bg-pink-50">
        <VideoSection videos={data.videos} />
      </section>

      {/* Love Counter Section */}
      <section className="relative z-10">
        <LoveCounter startDate={data.startDate} />
      </section>

      {/* Love Messages Section */}
      <section className="relative z-10 bg-white">
        <LoveMessages messages={data.messages} />
      </section>

      {/* Proposal Section */}
      <section className="relative z-10 pb-20">
        <ProposalSection 
          title={data.proposal.title}
          acceptText={data.proposal.acceptButton}
          rejectText={data.proposal.rejectButton}
          onAccept={handleAccept}
        />
      </section>
    </main>
  );
}
