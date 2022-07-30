export default function ApplicationLogo ({ className }) {
  return (
    <i className={'fa-solid fa-clapperboard ' + className ?? ''} />
  )
}
