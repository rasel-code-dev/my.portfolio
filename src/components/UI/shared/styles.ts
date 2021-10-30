
type M = {
  t?: string
  b?: string
  l?: string
  r?: string
  y?: string
  x?: string

}

interface Props {
  style?:any,
  bg?:string
  color?:string
  justify?:string
  alignItems?:string
  shadow?:string
  m?:string|number|M
  mt?:string|number
  mb?:string|number
  ml?:string|number
  mr?:string|number
  mx?:string|number
  my?:string|number
  p?:string|number|M
  pt?:string|number
  pb?:string|number
  pl?:string|number
  pr?:string|number
  py?:string|number
  px?:string|number
}

export default function(props: Props){


  const { style, bg, color, justify, alignItems, shadow, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px } = props

  type AllPaddingStyleType = {
    paddingTop?: number | string
    paddingBottom?: number | string
    paddingLeft?: number | string
    paddingRight?: number | string
    padding?: number | string

    marginTop?: number | string
    marginBottom?: number | string
    marginLeft?: number | string
    marginRight?: number | string
    margin?: number | string

    color?: string
    background?:  string
  }

  let marginStyles:  AllPaddingStyleType = {...style  }
  const isObjForMargin = typeof m == 'object' && Object.keys(m) && Object.keys(m).length > 0

  if(mt !== undefined) marginStyles.marginTop = `${mt}px`
  if(mb !== undefined) marginStyles.marginBottom = `${mb}px`
  if(ml !== undefined) marginStyles.marginLeft = `${ml}px`
  if(mr !== undefined) marginStyles.marginRight = `${mr}px`

  if(m !== undefined && !isObjForMargin ) marginStyles.margin = `${m}${m ? 'px' : ''}`

  if(m !== undefined && isObjForMargin){
    if (typeof m === "object"){
      let mt = m.t,
        mb = m.b,
        ml = m.l,
        mr = m.r,
        my = m.y,
        mx = m.x

      if (mt !== undefined) marginStyles.marginTop = mt
      if (mb !== undefined) marginStyles.marginBottom = mb
      if (ml !== undefined) marginStyles.marginLeft = ml
      if (mr !== undefined) marginStyles.marginRight = mr

      if (my !== undefined) {
        marginStyles.marginTop = my
        marginStyles.marginBottom = my
      }
      if (mx !== undefined) {
        marginStyles.marginRight = mx
        marginStyles.marginLeft = mx
      }
    }
  }

  if(my !== undefined){
    marginStyles.marginTop = `${my}${my ? checkAuto(my) ? '' : 'px' : ''}`
    marginStyles.marginBottom = `${my}${my ? checkAuto(my) ? '' : 'px' : ''}`

  }
  if(mx !== undefined){
    marginStyles.marginLeft = `${mx}${mx ? checkAuto(mx) ? '' : 'px' : ''}`
    marginStyles.marginRight = `${mx}${mx ? checkAuto(mx) ? '' : 'px' : ''}`
  }

  function checkAuto(value){
    return value === 'auto'
  }


    let paddingStyles: AllPaddingStyleType = {}
    const isObjForPadding = typeof p == 'object' && Object.keys(p) && Object.keys(p).length > 0

    if(pt !== undefined) paddingStyles.paddingTop = `${pt}px`
    if(pb !== undefined) paddingStyles.paddingBottom = `${pb}px`
    if(pl !== undefined) paddingStyles.paddingLeft = `${pl}px`
    if(pr !== undefined)  paddingStyles.paddingRight = `${pr}px`

    if(p !== undefined && !isObjForPadding ) paddingStyles.padding = `${p}${p ? 'px' : ''}`

    if(p !== undefined && isObjForPadding){
      if(typeof p === "object") {
        let pt = p.t
        let pb = p.b
        let pl = p.l
        let pr = p.r

        let py = p.y
        let px = p.x
        if(pt !== undefined) paddingStyles.paddingTop = pt
        if(pb !== undefined) paddingStyles.paddingBottom = pb
        if(pl !== undefined) paddingStyles.paddingLeft = pl
        if(pr !== undefined) paddingStyles.paddingRight = pr

        if(py !== undefined) {
          paddingStyles.paddingTop = py
          paddingStyles.paddingBottom = py
        }
        if(px !== undefined) {
          paddingStyles.paddingRight = px
          paddingStyles.paddingLeft = px
        }
      }



    }

    if(py !== undefined){
      paddingStyles.paddingTop = `${py}${py ? checkAuto(py) ? '' : 'px' : ''}`
      paddingStyles.paddingBottom = `${py}${py ? checkAuto(py) ? '' : 'px' : ''}`
    }
    if(px !== undefined){
      paddingStyles.paddingLeft = `${px}${px ? checkAuto(px) ? '' : 'px' : ''}`
      paddingStyles.paddingRight = `${px}${px ? checkAuto(px) ? '' : 'px' : ''}`
    }


    if(bg !== undefined){
      marginStyles.background = bg
    }
    if(color !== undefined){
      marginStyles.color = color
    }


  let k = {...style,  ...marginStyles}

  if(shadow !== undefined){
    k.boxShadow = shadow
  }
  if(justify){
    k.display = "flex"
    k.justifyContent = justify
  }
  if(alignItems){
    k.display = "flex"
    k.alignItems = alignItems
  }


  return k


}


