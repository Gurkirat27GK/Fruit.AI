import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs when component mounts
  useEffect(() => {
    fetchFAQs();
  }, []);

  // Function to fetch all FAQs from the backend
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/faqs');
      setFaqs(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setError('Failed to fetch FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission for adding or updating FAQs
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = selectedFAQ ? `http://127.0.0.1:8000/faqs/${selectedFAQ.id}` : 'http://127.0.0.1:8000/faqs';
      const method = selectedFAQ ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: { question, answer }
      });

      const updatedFaq = response.data;

      if (selectedFAQ) {
        setFaqs(faqs.map(faq => faq.id === updatedFaq.id ? updatedFaq : faq));
      } else {
        setFaqs([...faqs, updatedFaq]);
      }

      setQuestion('');
      setAnswer('');
      setSelectedFAQ(null);
      setError(null);
    } catch (error) {
      console.error('Error submitting FAQ:', error);
      setError('Failed to submit FAQ. Please try again later.');
    }
  };

  // Function to handle deleting an FAQ
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setError('Failed to delete FAQ. Please try again later.');
    }
  };

  // Function to handle editing an FAQ
  const handleEdit = (faq) => {
    setSelectedFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  return (
    <div className="faq-page">
      <h1>FAQs</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">{selectedFAQ ? 'Update FAQ' : 'Add FAQ'}</button>
      </form>

      <ul>
        {faqs.map(faq => (
          <li key={faq.id}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            <button onClick={() => handleEdit(faq)}>Edit</button>
            <button onClick={() => handleDelete(faq.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;
