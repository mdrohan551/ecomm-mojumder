import AdminModel from "../model/AdminModel.js";


// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { phoneNumber, adminName, email } = req.body;

    const existingAdmin = await AdminModel.findOne({ phoneNumber });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this phone number already exists" });
    }

    const admin = new AdminModel({ phoneNumber, adminName, email });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getadmin = async (req, res) => {
  try {
    const result = await AdminModel.find();

    // যদি রেজাল্ট ফাঁকা হয়, status true দিয়ে খালি অ্যারে রিটার্ন কর
    res.status(200).json({ message: "Get success", status: true, result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; // URL থেকে ID নেওয়া
    const { phoneNumber, adminName, email } = req.body;

    // Check if admin exists
    const existingAdmin = await AdminModel.findById(id);
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Optional: phoneNumber unique check
    if (phoneNumber && phoneNumber !== existingAdmin.phoneNumber) {
      const phoneExists = await AdminModel.findOne({ phoneNumber });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone number already in use by another admin" });
      }
    }

    // Update fields
    existingAdmin.phoneNumber = phoneNumber || existingAdmin.phoneNumber;
    existingAdmin.adminName = adminName || existingAdmin.adminName;
    existingAdmin.email = email || existingAdmin.email;

    await existingAdmin.save();

    res.status(200).json({ message: "Admin updated successfully", admin: existingAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
