import styled from 'styled-components/macro'

import { ChartWrapper, DeltaContainer, TokenPrice } from '../../Charts/PriceChart'
import { LoadingBubble } from '../loading'
import {
  AboutHeader,
  AboutSection,
  BreadcrumbNavLink,
  ChartContainer,
  ChartHeader,
  ContractAddressSection,
  ResourcesContainer,
  Stat,
  StatPair,
  StatsSection,
  TimeOptionsContainer,
  TokenInfoContainer,
  TokenNameCell,
  TopArea,
} from './TokenDetail'

/* Loading state bubbles */
const LoadingDetailBubble = styled(LoadingBubble)`
  height: 16px;
  width: 180px;
`
const TitleLoadingBubble = styled(LoadingDetailBubble)`
  width: 140px;
`
const SquareLoadingBubble = styled(LoadingDetailBubble)`
  height: 32px;
  border-radius: 8px;
  margin-top: 4px;
`
const PriceLoadingBubble = styled(SquareLoadingBubble)`
  height: 40px;
`
const LongLoadingBubble = styled(LoadingDetailBubble)`
  width: 100%;
`
const HalfLoadingBubble = styled(LoadingDetailBubble)`
  width: 50%;
`
const IconLoadingBubble = styled(LoadingDetailBubble)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`
const StatLoadingBubble = styled(SquareLoadingBubble)`
  width: 116px;
`
const StatsLoadingContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`
const ChartAnimation = styled.div`
  display: flex;
  animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -800px;
    }
  }
`
const Space = styled.div<{ heightSize: number }>`
  height: ${({ heightSize }) => `${heightSize}px`};
`
/* Loading State: row component with loading bubbles */
export default function LoadingTokenDetail() {
  return (
    <TopArea>
      <BreadcrumbNavLink to="/explore">
        <Space heightSize={20} />
      </BreadcrumbNavLink>
      <ChartHeader>
        <TokenInfoContainer>
          <TokenNameCell>
            <IconLoadingBubble />
            <TitleLoadingBubble />
          </TokenNameCell>
        </TokenInfoContainer>
        <ChartContainer>
          <ChartWrapper>
            <ChartHeader>
              <TokenPrice>
                <PriceLoadingBubble />
              </TokenPrice>
              <DeltaContainer>
                <Space heightSize={20} />
              </DeltaContainer>
            </ChartHeader>
            <ChartAnimation>
              <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
              </svg>
              <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
              </svg>
              <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
              </svg>
              <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
              </svg>
              <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
              </svg>
            </ChartAnimation>
          </ChartWrapper>
        </ChartContainer>
        <TimeOptionsContainer>
          <Space heightSize={32} />
        </TimeOptionsContainer>
      </ChartHeader>
      <AboutSection>
        <AboutHeader>
          <SquareLoadingBubble />
        </AboutHeader>
        <LongLoadingBubble />
        <LongLoadingBubble />
        <HalfLoadingBubble />

        <ResourcesContainer>{null}</ResourcesContainer>
      </AboutSection>
      <StatsSection>
        <StatsLoadingContainer>
          <StatPair>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
          </StatPair>
          <StatPair>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
          </StatPair>
        </StatsLoadingContainer>
      </StatsSection>
      <ContractAddressSection>{null}</ContractAddressSection>
    </TopArea>
  )
}
