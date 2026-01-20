import React, { useMemo } from "react"
import {  useEffect, useState, type ReactNode } from "react"
type ToggleProps = {
  value: boolean
  onToggle: (value: boolean) => void
  children?: ReactNode
}

const Toggle = ({ value, onToggle, children }: ToggleProps) => {
  const handleToggle = () => {
    onToggle(!value)
  }
  return (
    <>
      <button onClick={handleToggle}>Toggle</button>
      <p>You typed:{value}</p>
      {children}
    </>
  )
}

export const Settings = () => {
  const [value, setValue] = useState<boolean>(false)
  const onToggle = (value: boolean) => {
    setValue(value)
  }

  return (
    <Toggle value={value} onToggle={onToggle}>
      <p>{value ? "Enabled" : "Disabled"}</p>
    </Toggle>
  )
}

type userStatusProps = {
  userId: number
}
export const UserStatus = ({ userId }: userStatusProps) => {
  const [isLoading, setIsLoading] = useState<string>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(`User ${userId} online`)
    }, 1000);


    return () => clearTimeout(timer)
  }, [userId])

  return (
    <div>
      {isLoading}
    </div>
  )
}
type User = {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: "Anna" },
  { id: 2, name: "John" },
  { id: 3, name: "Mike" },
]
 
type UserItemProps = {
  name: string;
  onClick: () => void;
};



export const UserList = () => {
  const handleClick = (name: string) => {
    console.log(`User ${name} clicked`);
  };

  return (
    <ul>
      {users.map((user) => (
        <UserItem
          key={user.id}
          name={user.name}
          onClick={() => handleClick(user.name)}
        />
      ))}
    </ul>
  );
};


export const UserItem = React.memo(
  ({ name, onClick }: UserItemProps) => {
    return (
      <li>
        <p onClick={onClick}>{name}</p>
      </li>
    );
  }
);

type Product = {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1500 },
  { id: 2, name: "Mouse", price: 30 },
  { id: 3, name: "Keyboard", price: 80 },
  { id: 4, name: "Monitor", price: 300 },
]
export const ProductList =() => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const handleChangeFilter =() => {
    setMinPrice(prev => prev + 100);
  }
  const filteredProducts = useMemo(() => {
    return products.filter(product => product.price >=  minPrice);},[minPrice]);
    
  return (
    <ul>
      {filteredProducts.map((product) => 
      <li key={product.id}>product.name</li>)}
      <button onClick={handleChangeFilter}></button>
    </ul>
  )
}