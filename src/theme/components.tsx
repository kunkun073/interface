import { outboundLink } from 'components/analytics'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React, { HTMLProps, useCallback } from 'react'
import { ArrowLeft, Copy, ExternalLink as LinkIconFeather, Trash, X } from 'react-feather'
import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components/macro'

import { ReactComponent as TooltipTriangle } from '../assets/svg/tooltip_triangle.svg'
import { anonymizeLink } from '../utils/anonymizeLink'

export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? '20px'};
  height: ${({ size }) => size ?? '20px'};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.accentActive};
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.deprecated_text2 : theme.deprecated_primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

export const LinkStyle = css`
  text-decoration: none;
  color: ${({ theme }) => theme.accentAction};
  stroke: ${({ theme }) => theme.accentAction};
  cursor: pointer;
  font-weight: 500;

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  ${LinkStyle}
`

const LinkIconWrapper = styled.a`
  align-items: center;
  justify-content: center;
  display: flex;
`

const CopyIconWrapper = styled.div`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
`

const IconStyle = css`
  height: 16px;
  width: 18px;
  margin-left: 10px;
`

const LinkIcon = styled(LinkIconFeather)`
  ${IconStyle}
  ${LinkStyle}
`

const CopyIcon = styled(Copy)`
  ${IconStyle}
  ${LinkStyle}
  stroke: ${({ theme }) => theme.accentActive};
`

export const TrashIcon = styled(Trash)`
  ${IconStyle}
  stroke: ${({ theme }) => theme.deprecated_text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`

const rotateImg = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

export const UniTokenAnimated = styled.img`
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget

  const anonymizedHref = anonymizeLink(href)

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    outboundLink({ label: anonymizedHref }, () => {
      console.debug('Fired outbound link event', anonymizedHref)
    })
  } else {
    event.preventDefault()
    // send a ReactGA event and then trigger a location change
    outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref
    })
  }
}

const StyledLink = styled.a`
  ${LinkStyle}
`
/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest} />
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  )
}

const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translate(5px, 32px);
  z-index: 9999;
`

const CopiedTooltip = styled.div`
  background-color: ${({ theme }) => theme.black};
  text-align: center;
  justify-content: center;
  width: 60px;
  height: 32px;
  line-height: 32px;
  border-radius: 8px;

  color: ${({ theme }) => theme.white};
  font-size: 12px;
`

function ToolTip() {
  return (
    <ToolTipWrapper>
      <TooltipTriangle />
      <CopiedTooltip>Copied!</CopiedTooltip>
    </ToolTipWrapper>
  )
}

export function CopyLinkIcon({ toCopy }: { toCopy: string }) {
  const [isCopied, setCopied] = useCopyClipboard()
  const copy = useCallback(() => {
    setCopied(toCopy)
  }, [toCopy, setCopied])
  return (
    <CopyIconWrapper onClick={copy}>
      <CopyIcon />
      {isCopied && <ToolTip />}
    </CopyIconWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const SpinnerCss = css`
  animation: 2s ${rotate} linear infinite;
`

const Spinner = styled.img`
  ${SpinnerCss}
  width: 16px;
  height: 16px;
`
export const SpinnerSVG = styled.svg`
  ${SpinnerCss}
`

const BackArrowLink = styled(StyledInternalLink)`
  color: ${({ theme }) => theme.deprecated_text1};
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

export const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.deprecated_bg2};
`
