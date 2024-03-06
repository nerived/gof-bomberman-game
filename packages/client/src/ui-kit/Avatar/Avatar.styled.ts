import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Avatar = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

export const Change = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.TERRACOTTA};
  color: ${Colors.WHITE};
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: 0.3s;
`

export const ImgBox = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: ${Colors.TERRACOTTA};
  overflow: hidden;
  position: relative;
  margin-bottom: 21px;
  &:hover ${Change} {
    opacity: 1;
    visibility: visible;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const Current = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Name = styled.div`
  color: ${Colors.WHITE};
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  font-family: PressStart2P, Arial, sans-serif;
`

export const Img = styled.img``
