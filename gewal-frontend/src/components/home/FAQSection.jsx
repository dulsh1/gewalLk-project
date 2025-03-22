import React, { useState, useEffect } from 'react';
import faqService from '../../services/faqService';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../ui/accordion";
import { Loader2 } from "lucide-react";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories
        const categoriesData = await faqService.getCategories();
        setCategories(['All', ...categoriesData]);
        
        // Load FAQs
        const faqData = activeCategory !== 'All' 
          ? await faqService.getAllFaqs(activeCategory)
          : await faqService.getAllFaqs();
        
        setFaqs(faqData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading FAQ data:', err);
        setError('Unable to load FAQs. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, [activeCategory]);

  return (
    <section id="faqs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our real estate services</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQs */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq._id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                        <Badge variant="outline" className="mt-3">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center py-8 text-gray-500">
                No FAQs available in this category.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;