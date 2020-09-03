import Link from "next/link"

import NavStyles from "./styles/NavStyles"
const Nav = () => (

  <NavStyles>
    <Link href="/items">shop</Link>
    <Link href="/sell">sell</Link>
    <Link href="/signup">signup</Link>
    <Link href="/orders">orders</Link>
    <Link href="/me">me</Link>

  </NavStyles>
)

export default Nav