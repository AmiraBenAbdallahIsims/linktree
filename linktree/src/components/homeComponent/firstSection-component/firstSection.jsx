import "./firstSection.css"
export default function FirstSection()
{
    return(
        <div className="first-section"> 
            <div className="f-s-l-s" >
                <div><h1>Everything you are. In one, simple link in bio.</h1></div>
                <div><p>Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p></div>
                <div>
                    <form>
                        <div className="divf">linktr.ee/<input type="text" placeholder="your name"/></div>
                        
                        <button>Claim your Linktree</button>
                    </form>
                </div>
            </div>
            <div className="f-s-r-s">

            </div>
        </div>
    )
}