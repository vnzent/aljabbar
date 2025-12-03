export default function Map() {

    return (
      <div className="w-full h-full overflow-hidden mx-auto main-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2058844425815!2d106.81361831476876!3d-6.267027795469316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f187bbe4da75%3A0xd945aa908862d0e1!2sAl-Jabbar%20House%20Of%20Carpets%20%26%20Gallery!5e0!3m2!1sen!2sid!4v1733059200000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Al-Jabbar Location"
        />
      </div>
    );
}