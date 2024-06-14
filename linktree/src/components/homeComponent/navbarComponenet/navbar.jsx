import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogout = async() => {
        console.log('wa');
        const res = await fetch('http://localhost:3001/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token'),
                'userid' : localStorage.getItem('userid'),
            },
            
        });

        const data = await res.json();
        console.log(data);
        if(data.success == true){
            console.log(data);
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            navigate('/');
        }else{
            console.log(data.message)
        }
        
    };


    return (
        <div className="divone">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">Linktree*</Link>
                </div>
                <ul className="navbar-links">
                    <li><a href="/">Templates</a></li>
                    <li><a href="/">Marketplace</a></li>
                    <li><a href="/">Discover</a></li>
                    <li><a href="/">Pricing</a></li>
                    <li><a href="/">Learn</a></li>
                    <li><a href="/">Search</a></li>
                </ul>
                <div className="navbar-buttons">
                    {!token ? (
                        <>
                            <button className="login-button"><Link to="/login">Log in</Link></button>
                            <button className="signup-button"><Link to="/signup">Sign Up</Link></button>
                        </>
                    ) : (
                        <button className="signup-button" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </nav>
        </div>
    );
}
