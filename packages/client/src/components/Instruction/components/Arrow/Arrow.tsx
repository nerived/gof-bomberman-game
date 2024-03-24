import { Colors } from '../../../../tokens'

export const Arrow = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 12h12M6 12l5-5m-5 5 5 5"
        stroke={Colors.YELLOW}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
