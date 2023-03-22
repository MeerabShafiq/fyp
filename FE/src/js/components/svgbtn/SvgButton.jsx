import logo from '../../../assets/Sprite.svg';
const Image = ({
    id,
    className,
    href=logo,
    use,
    width= '20',
    height = width,
    stroke,
    fill,
    useStroke ,
    useFill ,
  }) => !href ? null : (
    <svg
      id={id}
      fill={fill || ' '}
      width={width}
      height={height}
      viewBox={`0 0 20 20`}
    >
        <use
          className='fill'
          href={!!use ? `${href}#${use}` : href}
        />
    </svg>
  )

  export default Image