type ItemOrderProps = {
  index:number
}

export const ItemOrder = ({index}: ItemOrderProps) => {
  return (
    <div className="item__order">{index}</div>
  )
}