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
   
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 italic">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 italic">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="1234567890"
            value={formData.phone} 
            onChange={handleChange} 
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 italic">{errors.phone}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea 
            name="message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1 italic">{errors.message}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Submit
        </button>
      </form>

      {/* Result Section */}
      {submittedData && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <h3 className="text-green-800 font-bold mb-2">✅ Submission Successful:</h3>
          <pre className="text-xs bg-white p-3 rounded border overflow-auto text-gray-700">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  </div>
);
}

export default ContactForm;
