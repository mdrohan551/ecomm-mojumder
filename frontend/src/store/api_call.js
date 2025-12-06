// src/store/api_call.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "https://ecomm-mojumder20.onrender.com/api/v1/";

const useStore = create((set, get) => ({
  // Admin
  adminData: null, loadingAdmin: false, errorAdmin: null,
  // Products
  flashSaleProducts: [], loadingProducts: false, errorProducts: null,
  // Sliders
  sliders: [], loadingSliders: false, errorSliders: null,

  _handleError: (err, defaultMessage) => err?.response?.data?.message || err?.message || defaultMessage,

  // Admin actions
  fetchAdmin: async () => {
    set({ loadingAdmin: true, errorAdmin: null });
    try {
      const res = await axios.get(`${API_URL}admin`);
      const first = res.data.result?.[0] || res.data || null;
      set({ adminData: first, loadingAdmin: false });
      return { success: true, data: first };
    } catch (err) {
      const error = get()._handleError(err, "অ্যাডমিন লোড ব্যর্থ");
      set({ errorAdmin: error, loadingAdmin: false });
      return { success: false, error };
    }
  },
  saveAdmin: async (data) => {
    set({ loadingAdmin: true, errorAdmin: null });
    try {
      const res = data._id ? await axios.put(`${API_URL}admin/${data._id}`, data) : await axios.post(`${API_URL}admin-data`, data);
      const admin = res.data.admin || res.data;
      set({ adminData: admin, loadingAdmin: false });
      return { success: true, data: admin };
    } catch (err) {
      const error = get()._handleError(err, "অ্যাডমিন সেভ ব্যর্থ");
      set({ errorAdmin: error, loadingAdmin: false });
      return { success: false, error };
    }
  },

  // Products
  fetchProducts: async () => {
    set({ loadingProducts: true, errorProducts: null });
    try {
      const res = await axios.get(`${API_URL}flash-sales`);
      const products = res.data.result || res.data || [];
      set({ flashSaleProducts: products, loadingProducts: false });
      return { success: true, data: products };
    } catch (err) {
      const error = get()._handleError(err, "প্রোডাক্ট লোড ব্যর্থ");
      set({ errorProducts: error, loadingProducts: false });
      return { success: false, error };
    }
  },
  createProduct: async (data) => {
    set({ loadingProducts: true, errorProducts: null });
    try {
      const res = await axios.post(`${API_URL}flash-sales`, data);
      const newP = res.data.product || res.data;
      set((state) => ({ flashSaleProducts: [...state.flashSaleProducts, newP], loadingProducts: false }));
      return { success: true, data: newP };
    } catch (err) {
      const error = get()._handleError(err, "প্রোডাক্ট তৈরি ব্যর্থ");
      set({ errorProducts: error, loadingProducts: false });
      return { success: false, error };
    }
  },
  updateProduct: async (id, data) => {
    set({ loadingProducts: true, errorProducts: null });
    try {
      // PUT to backend; backend will handle deleting old cloud image if needed
      const res = await axios.put(`${API_URL}flash-sales/${id}`, data);
      const updated = res.data.product || res.data;
      set((state) => ({ flashSaleProducts: state.flashSaleProducts.map(p => (p._id === id || p.id === id) ? updated : p), loadingProducts: false }));
      return { success: true, data: updated };
    } catch (err) {
      const error = get()._handleError(err, "প্রোডাক্ট আপডেট ব্যর্থ");
      set({ errorProducts: error, loadingProducts: false });
      return { success: false, error };
    }
  },
  deleteProduct: async (id) => {
    set({ loadingProducts: true, errorProducts: null });
    try {
      // backend endpoint will delete cloudinary image if exists then delete DB record
      await axios.delete(`${API_URL}flash-sales/${id}`);
      set((state) => ({ flashSaleProducts: state.flashSaleProducts.filter(p => (p._id !== id && p.id !== id)), loadingProducts: false }));
      return { success: true };
    } catch (err) {
      const error = get()._handleError(err, "প্রোডাক্ট ডিলিট ব্যর্থ");
      set({ errorProducts: error, loadingProducts: false });
      return { success: false, error };
    }
  },

  // Sliders
  fetchSliders: async () => {
    set({ loadingSliders: true, errorSliders: null });
    try {
      const res = await axios.get(`${API_URL}slides`);
      const slides = res.data.slides || res.data.result || [];
      set({ sliders: slides, loadingSliders: false });
      return { success: true, data: slides };
    } catch (err) {
      const error = get()._handleError(err, "স্লাইড লোড ব্যর্থ");
      set({ errorSliders: error, loadingSliders: false });
      return { success: false, error };
    }
  },
  createSlider: async (data) => {
    set({ loadingSliders: true, errorSliders: null });
    try {
      const res = await axios.post(`${API_URL}slides`, data);
      const newS = res.data.slide || res.data;
      set((state) => ({ sliders: [...state.sliders, newS], loadingSliders: false }));
      return { success: true, data: newS };
    } catch (err) {
      const error = get()._handleError(err, "স্লাইড তৈরি ব্যর্থ");
      set({ errorSliders: error, loadingSliders: false });
      return { success: false, error };
    }
  },
  updateSlider: async (id, data) => {
    set({ loadingSliders: true, errorSliders: null });
    try {
      const res = await axios.put(`${API_URL}slides/${id}`, data);
      const updated = res.data.slide || res.data;
      set((state) => ({ sliders: state.sliders.map(s => (s._id === id || s.id === id) ? updated : s), loadingSliders: false }));
      return { success: true, data: updated };
    } catch (err) {
      const error = get()._handleError(err, "স্লাইড আপডেট ব্যার্থ");
      set({ errorSliders: error, loadingSliders: false });
      return { success: false, error };
    }
  },
  deleteSlider: async (id) => {
    set({ loadingSliders: true, errorSliders: null });
    try {
      await axios.delete(`${API_URL}slides/${id}`);
      set((state) => ({ sliders: state.sliders.filter(s => (s._id !== id && s.id !== id)), loadingSliders: false }));
      return { success: true };
    } catch (err) {
      const error = get()._handleError(err, "স্লাইড ডিলিট ব্যর্থ");
      set({ errorSliders: error, loadingSliders: false });
      return { success: false, error };
    }
  },

  // Image upload/delete endpoints
  uploadImage: async (base64Image) => {
    try {
      const res = await axios.post(`${API_URL}upload`, { image: base64Image });
      const data = res.data.data || res.data;
      return { success: true, data };
    } catch (err) {
      const error = get()._handleError(err, "ইমেজ আপলোড ব্যর্থ");
      return { success: false, error };
    }
  },
  deleteImage: async (publicId) => {
    try {
      const res = await axios.delete(`${API_URL}upload/${encodeURIComponent(publicId)}`);
      return { success: true, data: res.data };
    } catch (err) {
      const error = get()._handleError(err, "ইমেজ ডিলিট ব্যর্থ");
      return { success: false, error };
    }
  }
}));

export default useStore;
