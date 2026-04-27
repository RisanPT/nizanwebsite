'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  status: string;
  sort_order: number;
}

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Bridal Makeover');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    if (!supabase) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        toast.error('Failed to fetch portfolio');
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return toast.error('Please select an image');
    
    setUploading(true);
    try {
      // 1. Validation & Clean Filename
      if (selectedFile.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit. Please compress the image.');
      }

      const fileExt = selectedFile.name.split('.').pop();
      const slug = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) || 'work';
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      // 2. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, selectedFile);

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Storage bucket "portfolio" not found. Please create it in Supabase dashboard.');
        }
        throw uploadError;
      }

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      // 4. Save to DB
      const { error: dbError } = await supabase
        .from('portfolio')
        .insert([{
          title: newTitle,
          category: newCategory,
          image_url: publicUrl,
          sort_order: items.length,
          status: 'active'
        }]);

      if (dbError) throw dbError;

      toast.success('Portfolio item added');
      setIsModalOpen(false);
      resetForm();
      fetchItems();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to add item';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // Delete from DB
      const { error: dbError } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);
      
      if (dbError) throw dbError;

      // Note: Ideally also delete from storage, but we'll skip for brevity 
      // as it requires parsing the URL to get the path.

      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      toast.error(message);
    }
  };

  const resetForm = () => {
    setNewTitle('');
    setNewCategory('Bridal Makeover');
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const categories = [
    'Bridal Makeover',
    'Editorial',
    'Celebrity Makeup',
    'Airbrush Artistry',
    'Event Glamour'
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-4xl text-white font-light tracking-tight mb-2">Portfolio</h2>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold">Manage your work showcase</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gold text-navy px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2 hover:bg-gold/90 transition-all shadow-lg shadow-gold/10"
        >
          <Plus size={16} />
          Add New Work
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="text-gold animate-spin" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="group relative aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-gold text-[9px] tracking-[0.3em] uppercase font-bold mb-1">{item.category}</span>
                <h3 className="text-white font-display text-lg font-light leading-tight">{item.title}</h3>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 bg-red-500/80 p-2 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 backdrop-blur-md"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-navy/60">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a1633] border border-white/10 w-full max-w-xl p-10 relative"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={24} />
            </button>

            <h3 className="font-display text-2xl text-white font-light mb-8">Add Portfolio Work</h3>

            <form onSubmit={handleAddItem} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Work Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. Signature Bridal Glow"
                  className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                >
                  {categories.map(cat => <option key={cat} value={cat} className="bg-navy text-white">{cat}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Image Upload</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed border-white/10 p-8 text-center cursor-pointer hover:border-gold/30 transition-all relative overflow-hidden aspect-[16/9] flex items-center justify-center
                    ${previewUrl ? 'p-0' : ''}
                  `}
                >
                  {previewUrl ? (
                    <Image 
                      src={previewUrl} 
                      alt="Preview"
                      fill
                      className="object-cover" 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="text-white/20" size={32} />
                      <p className="text-white/30 text-xs tracking-widest uppercase">Select high-res image</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              <button
                disabled={uploading}
                className="w-full bg-gold text-navy font-bold text-xs tracking-[0.2em] uppercase py-5 flex items-center justify-center gap-3 hover:bg-gold/90 transition-all disabled:opacity-50"
              >
                {uploading ? <Loader2 className="animate-spin" /> : 'Publish to Portfolio'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
