import React, { useState, useEffect } from 'react';
import faqService from '../../../services/faqService';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Alert, AlertDescription } from "../../ui/alert";
import { Loader2, Pencil, Trash2, Check, X } from "lucide-react";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../../ui/dialog";

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    isActive: true,
    displayOrder: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const categories = ['General', 'Buying', 'Selling', 'Renting', 'Property Management', 'Legal'];

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await faqService.getAllFaqs();
      setFaqs(data);
    } catch (err) {
      setError('Failed to fetch FAQs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (checked, name) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      isActive: true,
      displayOrder: 0
    });
    setEditMode(false);
    setCurrentFaqId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editMode) {
        await faqService.updateFaq(currentFaqId, formData);
        setSuccess('FAQ updated successfully!');
      } else {
        await faqService.createFaq(formData);
        setSuccess('New FAQ created successfully!');
      }
      fetchFAQs();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isActive: faq.isActive,
      displayOrder: faq.displayOrder || 0
    });
    setEditMode(true);
    setCurrentFaqId(faq._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDeleteDialog = (id) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteDialogOpen(false);
    
    if (!faqToDelete) return;
    
    try {
      await faqService.deleteFaq(faqToDelete);
      setSuccess('FAQ deleted successfully!');
      fetchFAQs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete FAQ');
    } finally {
      setFaqToDelete(null);
    }
  };

  const toggleStatus = async (faq) => {
    try {
      await faqService.updateFaq(faq._id, { isActive: !faq.isActive });
      fetchFAQs();
    } catch (err) {
      setError('Failed to update FAQ status');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editMode ? 'Edit FAQ' : 'Create New FAQ'}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 border-green-500 text-green-700">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Enter answer"
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange(value, 'category')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500">Lower numbers appear first</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleSwitchChange(checked, 'isActive')}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editMode ? 'Update FAQ' : 'Create FAQ'
                )}
              </Button>
              
              {editMode && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.length > 0 ? (
                    faqs.map((faq) => (
                      <TableRow key={faq._id}>
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {faq.question}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{faq.category}</Badge>
                        </TableCell>
                        <TableCell>{faq.displayOrder || 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge 
                              variant={faq.isActive ? "success" : "destructive"}
                              className="cursor-pointer"
                              onClick={() => toggleStatus(faq)}
                            >
                              {faq.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(faq)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openDeleteDialog(faq._id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No FAQs found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FAQManagement;