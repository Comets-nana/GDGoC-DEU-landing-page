import svgPaths from "./svg-5g7o2i01yl";

function Group2() {
  return (
    <div className="absolute inset-[27.81%_78.06%_39.1%_8.21%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111.996 61.8852">
        <g id="Group 6">
          <path d={svgPaths.p23ac5a70} fill="var(--fill-0, #FD2B25)" id="Vector" />
          <path d={svgPaths.pbfa4300} fill="var(--fill-0, #1E1E1E)" id="Vector_2" />
          <path d={svgPaths.p21681b00} fill="var(--fill-0, #1E1E1E)" id="Vector_3" />
          <path d={svgPaths.p34200680} fill="var(--fill-0, #1E1E1E)" id="Vector_4" />
          <path d={svgPaths.p3e79ea40} fill="var(--fill-0, #1E1E1E)" id="Vector_5" />
          <path d={svgPaths.p31c1e270} fill="var(--fill-0, #1E1E1E)" id="Vector_6" />
          <path d={svgPaths.p209c1600} fill="var(--fill-0, #1E1E1E)" id="Vector_7" />
          <path d={svgPaths.pda4d900} fill="var(--fill-0, #1E1E1E)" id="Vector_8" />
          <path d={svgPaths.p2d0c3bf0} fill="var(--fill-0, #1E1E1E)" id="Vector_9" />
          <g id="Vector_10" />
          <path d={svgPaths.p273e5200} fill="var(--fill-0, #1E1E1E)" id="Vector_11" />
          <path d={svgPaths.p1f40fb00} fill="var(--fill-0, #1E1E1E)" id="Vector_12" />
          <path d={svgPaths.p33727400} fill="var(--fill-0, #1E1E1E)" id="Vector_13" />
          <path d={svgPaths.p308a3070} fill="var(--fill-0, #1E1E1E)" id="Vector_14" />
          <g id="Vector_15" />
          <path d={svgPaths.p2182d680} fill="var(--fill-0, #1E1E1E)" id="Vector_16" />
          <path d={svgPaths.p99a3900} fill="var(--fill-0, #1E1E1E)" id="Vector_17" />
          <path d={svgPaths.p2a009f00} fill="var(--fill-0, #1F86FB)" id="Vector_18" />
          <path d={svgPaths.p6d0ad40} fill="var(--fill-0, #1E1E1E)" id="Vector_19" />
          <path d={svgPaths.p211611a0} fill="var(--fill-0, #00AA47)" id="Vector_20" />
          <path d={svgPaths.p1a6cb1b0} fill="var(--fill-0, #1E1E1E)" id="Vector_21" />
          <path d={svgPaths.p307b2480} fill="var(--fill-0, #1E1E1E)" id="Vector_22" />
          <path d={svgPaths.p29bbc00} fill="var(--fill-0, #FFA600)" id="Vector_23" />
          <path d={svgPaths.p1c9407f0} fill="var(--fill-0, #1E1E1E)" id="Vector_24" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[191px] not-italic top-[37px] whitespace-pre-wrap">
      <p className="absolute font-['Google_Sans_Display:Regular',sans-serif] inset-[19.79%_8.33%_20.32%_23.41%] leading-[normal] text-[#1e1e1e] text-[48px]">Google Developer Groups</p>
      <p className="absolute font-['Product_Sans:Regular',sans-serif] inset-[50.8%_18.53%_33.16%_23.73%] leading-[0] text-[#4285f4] text-[24px]">
        <span className="leading-[normal]">on Campus</span>
        <span className="font-['Product_Sans:Bold',sans-serif] leading-[normal]">{` `}</span>
        <span className="font-['Product_Sans:Bold',sans-serif] leading-[normal] text-black">·</span>
        <span className="font-['Product_Sans:Bold',sans-serif] leading-[normal]">{` `}</span>
        <span className="leading-[normal] text-black">Dong-Eui University</span>
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[316px] text-[#1e1e1e] text-[48px] top-[80px] w-[12.261px]">·</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[67px] top-[37px]">
      <Group2 />
      <Group />
    </div>
  );
}

export default function Logo() {
  return (
    <div className="bg-white relative size-full" data-name="logo">
      <Group1 />
    </div>
  );
}