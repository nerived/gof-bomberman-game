import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
`

export const Title = styled.h2`
  margin: 30px 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 34px;
  line-height: 40px;
  color: ${Colors.WHITE};
`
