import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AlwaysScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const includePaths = [
            "/",
            "/shop",
            "/faq",
            "/contact",
            "/view_cart",
            "/login",
            "/forgot_password",
            "/register",
            "/profile",
            "/profile/edit",
            "/terms_conditions",
            "/privacy_policy"
        ];
        
        const productRoutePaths = pathname.startsWith("/product/") || pathname.startsWith("/category/");

        if (includePaths.includes(pathname) || productRoutePaths) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);
    
  return null
}

export default AlwaysScrollToTop
