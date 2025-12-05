// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FiHome, FiPlus, FiEdit, FiTrash2, FiLoader, FiUpload
} from "react-icons/fi";
import useStore from "../store/api_call";
import { useNavigate } from "react-router-dom";

/* ===========================
   ImageUploader (multiple)
   =========================== */
const ImageUploader = ({ images = [], onAddImage, onRemoveImage }) => {

  const { uploadImage, deleteImage } = useStore();
  const [loadingIds, setLoadingIds] = useState([]);
  const [error, setError] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ফাইলের সাইজ 5MB এর বেশি হবে না");
      e.target.value = null;
      return;
    }

    const tempId = Date.now().toString();
    setLoadingIds((s) => [...s, tempId]);
    setError(null);
    const t = toast.loading("ছবি আপলোড হচ্ছে...");

    try {
      const base64 = await toBase64(file);
      const res = await uploadImage(base64);
      if (!res.success) {
        setError(res.error || "Upload failed");
        toast.error(res.error || "ইমেজ আপলোড ব্যর্থ");
        return;
      }
      const info = { url: res.data.secure_url || res.data.url, public_id: res.data.public_id };
      onAddImage && onAddImage(info);
      toast.success("ইমেজ আপলোড সফল");
    } catch (err) {
      console.error("upload error", err);
      setError("ইমেজ আপলোডে সমস্যা হয়েছে");
      toast.error("ইমেজ আপলোডে সমস্যা হয়েছে");
    } finally {
      setLoadingIds((s) => s.filter((id) => id !== tempId));
      toast.dismiss(t);
      e.target.value = null;
    }
  };

  const handleRemove = async (public_id) => {
    if (!public_id) {
      onRemoveImage && onRemoveImage(public_id);
      return;
    }
    if (!window.confirm("আপনি কি নিশ্চিত যে এই ছবি মুছে ফেলবেন?")) return;
    const t = toast.loading("ছবি মুছে ফেলা হচ্ছে...");
    try {
      const res = await deleteImage(public_id);
      if (!res.success) toast.error("Cloudinary থেকে মুছে ফেলতে সমস্যা হয়েছে");
      else {
        onRemoveImage && onRemoveImage(public_id);
        toast.success("ছবি মুছে ফেলা হয়েছে");
      }
    } catch (err) {
      console.error(err);
      toast.error("ডিলিটে সমস্যা হয়েছে");
    } finally {
      toast.dismiss(t);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-3">
        {images.length ? images.map((img, idx) => (
          <div key={img.public_id || img.url || idx} className="relative bg-white rounded-md overflow-hidden border">
            <img src={img.url || img.image || img} alt={`img-${idx}`} className="w-full h-24 object-cover" />
            <button onClick={() => handleRemove(img.public_id)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow" title="ছবি ডিলিট">
              <FiTrash2 />
            </button>
          </div>
        )) : <div className="col-span-full text-center p-4 text-sm text-gray-500">কোনো ছবি নেই — নতুন ছবি আপলোড করুন</div>}
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="multi-file-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow flex items-center">
          <FiUpload className="mr-2" /> নতুন ছবি আপলোড
        </label>
        <input id="multi-file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {loadingIds.length > 0 && <div className="text-indigo-600 flex items-center"><FiLoader className="animate-spin mr-2" /> আপলোড হচ্ছে...</div>}
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <p className="text-xs text-gray-500 mt-2">PNG / JPG / JPEG — সর্বোচ্চ 5MB প্রতি ছবি</p>
    </div>
  );
};

/* ===========================
   AdminSettings
   =========================== */
const AdminSettings = ({ adminData, loadingAdmin, errorAdmin, fetchAdmin, saveAdmin }) => {
  const [form, setForm] = useState({ adminName: "", phoneNumber: "", email: "", _id: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (adminData) setForm(adminData);
    else fetchAdmin();
  }, [adminData, fetchAdmin]);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const t = toast.loading("অ্যাডমিন তথ্য সংরক্ষণ করা হচ্ছে...");
    const res = await saveAdmin(form);
    toast.dismiss(t);
    if (res.success) {
      toast.success("অ্যাডমিন তথ্য সংরক্ষিত হয়েছে");
      setEditing(false);
    } else toast.error("সংরক্ষণ ব্যর্থ: " + (res.error || ""));
  };

  if (loadingAdmin && !adminData) return <div className="p-8 text-center"><FiLoader className="animate-spin mr-2" />অ্যাডমিন লোড হচ্ছে...</div>;
  if (errorAdmin) return <div className="p-6 bg-red-100 text-red-700 rounded">{errorAdmin}</div>;

  return (
    <section className="p-4 sm:p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">⚙️ অ্যাডমিন সেটিংস</h2>
        {!editing ? <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white py-1 px-3 rounded">এডিট</button> :
          <button onClick={() => { setEditing(false); setForm(adminData || { adminName: "", phoneNumber: "", email: "" }); toast("বাতিল করা হয়েছে"); }} className="bg-gray-300 py-1 px-3 rounded">বাতিল</button>}
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm block mb-1">নাম</label>
          <input name="adminName" value={form.adminName || ""} onChange={onChange} readOnly={!editing} required className={`w-full p-2 border rounded ${editing ? "bg-white" : "bg-gray-50 text-gray-500"}`} />
        </div>
        <div>
          <label className="text-sm block mb-1">ফোন</label>
          <input name="phoneNumber" value={form.phoneNumber || ""} onChange={onChange} readOnly={!editing} required className={`w-full p-2 border rounded ${editing ? "bg-white" : "bg-gray-50 text-gray-500"}`} />
        </div>
        <div>
          <label className="text-sm block mb-1">ইমেইল</label>
          <input name="email" type="email" value={form.email || ""} onChange={onChange} readOnly={!editing} required className={`w-full p-2 border rounded ${editing ? "bg-white" : "bg-gray-50 text-gray-500"}`} />
        </div>

        {editing && (
          <div className="md:col-span-3 flex justify-end mt-2">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">সংরক্ষণ</button>
          </div>
        )}
      </form>
    </section>
  );
};

/* ===========================
   ProductSlideModal
   =========================== */
const ProductSlideModal = ({ isOpen, onClose, itemData, type, onSave, loading, initialFormData, ImageUploaderComponent }) => {
  const [form, setForm] = useState(initialFormData);
  useEffect(() => { setForm(initialFormData); }, [initialFormData, isOpen]);

  const onChange = (e) => {
    const { name, value, type: t, checked } = e.target;
    setForm((p) => ({ ...p, [name]: t === "checkbox" ? checked : value }));
  };

  const handleAddImage = (img) => setForm((p) => ({ ...p, images: [...(p.images || []), img] }));
  const handleRemoveImage = (public_id) => setForm((p) => ({ ...p, images: (p.images || []).filter((im) => im.public_id !== public_id) }));

  const submit = (e) => {
    e.preventDefault();
    const id = itemData?._id || itemData?.id || null;
    const payload = { ...form };
    if (payload.images && payload.images.length) {
      payload.image = payload.images[0].url;
      payload.public_id = payload.images[0].public_id;
    } else {
      payload.image = "";
      payload.public_id = "";
    }
    onSave(id, payload);
  };

  if (!isOpen) return null;
  const isProduct = type === "product";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-5 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{itemData ? `আপডেট ${isProduct ? "প্রোডাক্ট" : "স্লাইড"}` : `নতুন ${isProduct ? "প্রোডাক্ট" : "স্লাইড"}`}</h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="bg-gray-200 px-3 py-1 rounded">Close</button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Images</label>
            <ImageUploaderComponent images={form.images || []} onAddImage={handleAddImage} onRemoveImage={handleRemoveImage} />
          </div>

          <div>
            <label className="block mb-1 font-medium">{isProduct ? "প্রোডাক্ট নাম" : "টাইটেল"}</label>
            <input name={isProduct ? "name" : "title"} value={isProduct ? form.name || "" : form.title || ""} onChange={onChange} required className="w-full p-2 border rounded" />
          </div>

          {isProduct ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">বিক্রয় মূল্য (৳)</label>
                  <input name="price" type="number" value={form.price || 0} onChange={onChange} step="0.01" required className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">পূর্ব মূল্য (৳)</label>
                  <input name="oldPrice" type="number" value={form.oldPrice || 0} onChange={onChange} step="0.01" className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="instock" name="instock" type="checkbox" checked={!!form.instock} onChange={onChange} />
                <label htmlFor="instock">ইনস্টক আছে</label>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">ট্যাগ</label>
                  <input name="tag" value={form.tag || ""} onChange={onChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">সাবটাইটেল</label>
                  <input name="subtitle" value={form.subtitle || ""} onChange={onChange} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">ডিসকাউন্ট (%)</label>
                <input name="discountPercentage" type="number" value={form.discountPercentage || 0} onChange={onChange} className="w-full p-2 border rounded" />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 font-medium">বিস্তারিত</label>
            <textarea name="description" value={form.description || ""} onChange={onChange} rows={4} className="w-full p-2 border rounded" />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">বাতিল</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              {loading ? <FiLoader className="animate-spin" /> : (itemData ? "আপডেট" : "তৈরি")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===========================
   ListManager (Products & Sliders)
   =========================== */
const ListManager = ({ title, Icon, items = [], loading, error, fetchItems, createItem, updateItem, deleteItem, type, ImageUploaderComponent }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const { deleteImage } = useStore();

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openCreate = () => { setEdit(null); setOpen(true); };
  const openEdit = (it) => { setEdit(it); setOpen(true); };

  const handleSave = async (id, data) => {
    const toastId = toast.loading(id ? `${title} আপডেট হচ্ছে...` : `${title} তৈরি হচ্ছে...`);
    try {
      const res = id ? await updateItem(id, data) : await createItem(data);
      toast.dismiss(toastId);
      if (res.success) toast.success(`${title} সফল হয়েছে`);
      else toast.error(`${title} ব্যর্থ: ${res.error || ""}`);
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("অপস! সমস্যা হয়েছে");
    } finally {
      setOpen(false);
    }
  };
  const handleDelete = async (item) => {
    const id = item._id || item.id;
    if (!id) return toast.error("ID পাওয়া যায়নি");

    toast((t) => (
      <div className="p-2">
        <div className="font-semibold mb-2">আপনি কি নিশ্চিত? <span className="font-bold">{title}</span> মুছে যাবে এবং এর ছবি Cloudinary থেকে মুছে যাবে।</div>
        <div className="flex gap-2 justify-end">
          <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 bg-gray-200 rounded">বাতিল</button>
          <button onClick={async () => {
            toast.dismiss(t.id);
            const dl = toast.loading("মুছে ফেলা হচ্ছে...");

            try {
              // ==== Cloudinary images delete logic ====
              // সব ধরনের structure handle করা
              const imgs = [];

              if (Array.isArray(item.images) && item.images.length) {
                // images array থাকলে সব public_id push করো
                item.images.forEach(img => {
                  if (img?.public_id) imgs.push(img.public_id);
                  else if (img?.url) {
                    // যদি public_id না থাকে, url থেকে ধরার চেষ্টা (optional)
                    const parts = img.url.split('/');
                    const last = parts[parts.length - 1].split('.')[0];
                    imgs.push(last);
                  }
                });
              } else if (item.public_id) {
                // single image case
                imgs.push(item.public_id);
              } else if (item.image) {
                // যদি শুধু url থাকে, last part as public_id
                const parts = item.image.split('/');
                const last = parts[parts.length - 1].split('.')[0];
                imgs.push(last);
              }

              // delete from Cloudinary
              for (const public_id of imgs) {
                await deleteImage(public_id);
              }

              // ==== delete item from DB ====
              const res = await deleteItem(id);
              toast.dismiss(dl);

              if (res.success) toast.success("মুছে ফেলা হয়েছে");
              else toast.error("ডিলিট ব্যর্থ: " + (res.error || ""));

            } catch (err) {
              console.error(err);
              toast.dismiss(dl);
              toast.error("ডিলিটে সমস্যা হয়েছে");
            }

          }} className="px-3 py-1 bg-red-600 text-white rounded">ডিলিট করুন</button>
        </div>
      </div>
    ), { position: "top-center", duration: 8000 });
  };


  const isProduct = type === "product";

  if (loading && items.length === 0) return <div className="p-8 text-center"><FiLoader className="animate-spin mr-2" /> লোড হচ্ছে...</div>;
  if (error) return <div className="p-6 bg-red-100 text-red-600 rounded">{error}</div>;

  return (
    <section className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold flex items-center gap-2"><Icon className="text-indigo-600" /> {title}</h3>
        <button onClick={openCreate} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2"><FiPlus /> নতুন</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items && items.length ? items.map((it) => {
          const images = Array.isArray(it.images) && it.images.length ? it.images : (it.image ? [{ url: it.image, public_id: it.public_id || "" }] : []);
          return (
            <article key={it._id || it.id} className="bg-gray-50 p-3 rounded shadow-sm flex flex-col">
              <div className="grid grid-cols-3 gap-2">
                {images.length ? images.slice(0, 3).map((im, idx) => (
                  <div key={im.public_id || im.url || idx} className="h-28 overflow-hidden rounded">
                    <img src={im.url} alt={`img-${idx}`} className="w-full h-full object-cover" />
                  </div>
                )) : <div className="col-span-3 h-28 flex items-center justify-center text-gray-400">No image</div>}
              </div>

              <div className="mt-3 flex-1">
                <h4 className="font-semibold text-lg">{isProduct ? it.name : it.title}</h4>
                {isProduct ? <p className="text-gray-600 text-sm line-clamp-2">{it.description}</p> : <p className="text-gray-600 text-sm">{it.subtitle || ""}</p>}
                {isProduct && <p className="mt-2 font-bold text-indigo-600">৳ {it.price} {it.oldPrice && <span className="line-through text-gray-400 ml-2">৳ {it.oldPrice}</span>}</p>}
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(it)} className="flex-1 bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"><FiEdit /> এডিট</button>
                <button onClick={() => handleDelete(it)} className="flex-1 bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"><FiTrash2 /> ডিলিট</button>
              </div>
            </article>
          );
        }) : <div className="col-span-full p-8 text-center text-gray-500">কোনো আইটেম নেই</div>}
      </div>

      {open && (
        <ProductSlideModal
          isOpen={open}
          onClose={() => setOpen(false)}
          itemData={edit}
          type={type}
          onSave={handleSave}
          loading={loading}
          initialFormData={edit ? { ...edit, images: Array.isArray(edit.images) && edit.images.length ? edit.images : (edit.image ? [{ url: edit.image, public_id: edit.public_id || "" }] : []) } : (type === "product" ? { name: "", description: "", images: [], price: 0, oldPrice: 0, instock: true } : { title: "", subtitle: "", tag: "", description: "", images: [], discountPercentage: 0 })}
          ImageUploaderComponent={ImageUploaderComponent}
        />
      )}
    </section>
  );
};

/* ===========================
   Admin Main
   =========================== */
const Admin = () => {
  const PROTECTED_KEY = 'admin_authenticated';
  const navigate = useNavigate();

  // 🚪 লগআউট ফাংশন
  const handleLogout = () => {
    // 1. localStorage থেকে অথেন্টিকেশন স্টেট মুছে ফেলা
    localStorage.removeItem(PROTECTED_KEY);

    // 2. টোস্ট মেসেজ দেখানো
    toast('👋 Successfully Logged Out!', {
      icon: '🚪',
      duration: 3000,
    });

    // 3. ব্যবহারকারীকে হোমপেজে রিডাইরেক্ট করা
    navigate('/'); 
  };
  const {
    adminData, loadingAdmin, errorAdmin, fetchAdmin, saveAdmin,
    flashSaleProducts, loadingProducts, errorProducts, fetchProducts, createProduct, updateProduct, deleteProduct,
    sliders, loadingSliders, errorSliders, fetchSliders, createSlider, updateSlider, deleteSlider
  } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
          <button 
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#dc3545', // লাল রং
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
        }}
      >
        Log Out
      </button>
      <Toaster position="top-right" />
      <header className="bg-indigo-700 text-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-3"><FiHome /> অ্যাডমিন ড্যাশবোর্ড</h1>
        </div>
    
      </header>

      <main className="max-w-6xl mx-auto py-8 space-y-6 px-4">
        <AdminSettings adminData={adminData} loadingAdmin={loadingAdmin} errorAdmin={errorAdmin} fetchAdmin={fetchAdmin} saveAdmin={saveAdmin} />

        <ListManager
          title="ফ্ল্যাশ সেল প্রোডাক্ট"
          Icon={FiPlus}
          items={flashSaleProducts}
          loading={loadingProducts}
          error={errorProducts}
          fetchItems={fetchProducts}
          createItem={createProduct}
          updateItem={updateProduct}
          deleteItem={deleteProduct}
          type="product"
          ImageUploaderComponent={ImageUploader}
        />

        <ListManager
          title="স্লাইডার ম্যানেজমেন্ট"
          Icon={FiEdit}
          items={sliders}
          loading={loadingSliders}
          error={errorSliders}
          fetchItems={fetchSliders}
          createItem={createSlider}
          updateItem={updateSlider}
          deleteItem={deleteSlider}
          type="slider"
          ImageUploaderComponent={ImageUploader}
        />
      </main>
    </div>
  );
};

export default Admin;
