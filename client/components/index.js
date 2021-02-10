/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Home} from './home'
export { Login, Signup } from './AuthForm'
export { default as AdminTools } from './AdminTools'
export { default as AllProducts } from './AllProducts'
export { default as productForm } from '../components/Admin/productForm'