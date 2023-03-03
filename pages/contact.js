import lionPicture from '../assets/img.jpg';
import Image from 'next/image';

const CONTACT = () => {
    return (
        <div className="root">
            <div class="container">
                <dvi className="from-grid">
                    <form action="#" method="POST" class="contact-form">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" required />
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" name="subject" id="subject" required />
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="message" id="message" rows="5" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <div class="image">
                        <Image src={lionPicture} alt="Image" />
                    </div>
                </dvi>
            </div>
        </div>
    );
}
export default CONTACT