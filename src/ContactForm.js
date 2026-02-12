import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    // Phone validation: Regex for exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits (e.g., 1234567890)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', message: '', phone: '' }); // Clear phone
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </label>

        <br /><br />

        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>

        <br /><br />

        <label>
          Message:
          <br />
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </label>

        <br /><br />

        <label>
          Phone Number:
          <br />
            <input 
              type="tel" 
              name="phone" 
              placeholder="1234567890"
              value={formData.phone} 
              onChange={handleChange} 
          />
          {errors.phone && <p style={{color: 'red', fontSize: '12px'}}>{errors.phone}</p>}
        </label>
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
