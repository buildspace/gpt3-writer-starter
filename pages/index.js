const CHAT = () => {
    return (
        <div className="root">
            <title> A Kageboshi services</title>
            <section className="hero">
                <h1>Kageboshi, your everyday assistant</h1>
                <p>Your enigmatic friend, always ready to lend a helping hand</p>
                <a href="/chat" className="btn">Learn More</a>
            </section>
            <section className="features">
                <div>
                    <img src="https://via.placeholder.com/300x200" alt="Feature 1" />
                    <h2>Fuorisalone</h2>
                    <p>Fuorisalone is a design and cultural event held during Milan Design Week.</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/300x200" alt="Feature 2" />
                    <h2>Salone del Mobile</h2>
                    <p>Salone del Mobile is an annual furniture and design exhibition held in Milan</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/300x200" alt="Feature 3" />
                    <h2>Milan Design Week side events</h2>
                    <p>Mostly offsite exhibitions, installations, and pop-ups that showcase design and creativity across the city.</p>
                </div>
            </section>
        </div>
    );
}

export default CHAT