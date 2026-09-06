import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../theme";

function NoDataIllustration({
  isDark = false,
  width = 150,
  height = 130,
  ...props
}) {
  const brandPrimary = COLORS.PRIMARY;
  const brandPrimaryLight = COLORS.PRIMARY_LIGHT;
  const brandWarning = COLORS.WARNING;
  const brandSecondary = COLORS.SECONDARY;

  // Surfaces & Accents derived directly from MF COLORS
  const frontCardStart = isDark ? COLORS.DARK_PAPER : COLORS.LIGHT_PAPER;
  const frontCardEnd = isDark ? COLORS.DARK_BG : COLORS.LIGHT_SURFACE_MUTED;

  const backCardStart = isDark ? COLORS.DARK_DIVIDER : COLORS.LIGHT_DIVIDER;
  const backCardEnd = isDark ? COLORS.DARK_SURFACE_MUTED : COLORS.LIGHT_BG;

  const cardStroke = isDark ? COLORS.DARK_DIVIDER : COLORS.LIGHT_DIVIDER;
  const shadowColor = isDark ? "#000000" : COLORS.SECONDARY;

  const textColor = isDark
    ? COLORS.DARK_TEXT_PRIMARY
    : COLORS.LIGHT_TEXT_PRIMARY;
  const badgeBg = isDark ? COLORS.DARK_PAPER : COLORS.LIGHT_PAPER;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Ambient Back Glow */}
        <radialGradient id="noDataGlow" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={brandPrimary}
            stopOpacity={isDark ? "0.28" : "0.15"}
          />
          <stop offset="100%" stopColor={brandPrimary} stopOpacity="0" />
        </radialGradient>

        {/* Front Card Surface Gradient */}
        <linearGradient id="frontCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={frontCardStart} stopOpacity="0.95" />
          <stop offset="100%" stopColor={frontCardEnd} stopOpacity="0.92" />
        </linearGradient>

        {/* Back Card Stack Gradient */}
        <linearGradient id="backCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={backCardStart} stopOpacity="0.75" />
          <stop offset="100%" stopColor={backCardEnd} stopOpacity="0.5" />
        </linearGradient>

        {/* Brand Terracotta Gradient */}
        <linearGradient id="brandFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brandPrimaryLight} />
          <stop offset="100%" stopColor={brandPrimary} />
        </linearGradient>

        {/* Gold Accent Gradient */}
        <linearGradient id="brandGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brandWarning} />
          <stop offset="100%" stopColor={brandPrimary} />
        </linearGradient>

        {/* Elevation Drop Shadow */}
        <filter
          id="cardSoftShadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="10"
            floodColor={shadowColor}
            floodOpacity={isDark ? "0.55" : "0.14"}
          />
        </filter>

        {/* Floating Badge Shadow */}
        <filter
          id="floatingBadgeShadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="5"
            floodColor={brandPrimary}
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      {/* Background Ambient Glow */}
      <circle cx="75" cy="65" r="58" fill="url(#noDataGlow)" />

      {/* Concentric Geometric Orbit Rings */}
      <circle
        cx="75"
        cy="65"
        r="48"
        stroke={brandPrimary}
        strokeWidth="1.2"
        strokeDasharray="3 5"
        strokeOpacity={isDark ? "0.3" : "0.22"}
      />
      <circle
        cx="75"
        cy="65"
        r="61"
        stroke={isDark ? textColor : brandSecondary}
        strokeWidth="1"
        strokeDasharray="2 6"
        strokeOpacity="0.12"
      />

      {/* Floating Sparkles & Details */}
      {/* Top Right Gold Star */}
      <path
        d="M120 27L121.5 32L126.5 33.5L121.5 35L120 40L118.5 35L113.5 33.5L118.5 32Z"
        fill="url(#brandGoldGrad)"
      />
      {/* Bottom Left Flame Sparkle */}
      <path
        d="M28 88L29 91.5L32.5 92.5L29 93.5L28 97L27 93.5L23.5 92.5L27 91.5Z"
        fill="url(#brandFlameGrad)"
        opacity="0.85"
      />
      {/* Subtle Orbiting Dots */}
      <circle cx="34" cy="38" r="2.5" fill={brandWarning} opacity="0.55" />
      <circle cx="123" cy="84" r="2" fill={brandPrimary} opacity="0.55" />

      {/* Back Angled Card */}
      <rect
        x="42"
        y="24"
        width="70"
        height="74"
        rx="12"
        transform="rotate(-6 42 24)"
        fill="url(#backCardGrad)"
        stroke={cardStroke}
        strokeWidth="1.2"
      />

      {/* Front Elevated Card */}
      <rect
        x="40"
        y="28"
        width="70"
        height="74"
        rx="12"
        fill="url(#frontCardGrad)"
        filter="url(#cardSoftShadow)"
        stroke={cardStroke}
        strokeWidth="1.5"
      />

      {/* Front Card Header Colored Tab */}
      <rect
        x="52"
        y="24"
        width="26"
        height="5"
        rx="2.5"
        fill="url(#brandFlameGrad)"
      />

      {/* Card Skeleton Content Lines */}
      <rect
        x="52"
        y="43"
        width="30"
        height="4"
        rx="2"
        fill={textColor}
        opacity={isDark ? "0.65" : "0.55"}
      />
      <rect
        x="52"
        y="53"
        width="46"
        height="3"
        rx="1.5"
        fill={textColor}
        opacity={isDark ? "0.22" : "0.18"}
      />
      <rect
        x="52"
        y="61"
        width="38"
        height="3"
        rx="1.5"
        fill={textColor}
        opacity={isDark ? "0.22" : "0.18"}
      />
      <rect
        x="52"
        y="69"
        width="42"
        height="3"
        rx="1.5"
        fill={textColor}
        opacity={isDark ? "0.14" : "0.12"}
      />

      {/* Floating Search / Discovery Badge on Bottom Right */}
      <g filter="url(#floatingBadgeShadow)">
        <circle cx="98" cy="86" r="19" fill="url(#brandFlameGrad)" />
        <circle cx="98" cy="86" r="15" fill={badgeBg} />

        {/* Minimalist Magnifier Lens & Handle */}
        <circle
          cx="96"
          cy="84"
          r="6"
          stroke="url(#brandFlameGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M100.5 88.5L105 93"
          stroke="url(#brandFlameGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Subtle Horizon Line in Lens */}
        <path
          d="M93.5 84H98.5"
          stroke="url(#brandFlameGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

NoDataIllustration.propTypes = {
  isDark: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default NoDataIllustration;
