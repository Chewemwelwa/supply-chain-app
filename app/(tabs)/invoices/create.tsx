import { useRouter } from "expo-router";
import { ChevronDown, Plus, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockBuyers, mockFarmers, mockProducts } from "@/constants/mockData";
import { useInvoiceStore } from "@/store/invoiceStore";
import { Buyer, Farmer, InvoiceItem, Product } from "@/types";

export default function CreateInvoiceScreen() {
  const router = useRouter();
  const { createInvoice, isLoading } = useInvoiceStore();

  // For demo purposes, we'll use the first farmer and buyer
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer>(mockFarmers[0]);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer>(mockBuyers[0]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [showFarmerDropdown, setShowFarmerDropdown] = useState(false);
  const [showBuyerDropdown, setShowBuyerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || parseFloat(quantity) <= 0) {
      Alert.alert("Error", "Please select a product and enter a valid quantity");
      return;
    }

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: selectedProduct.name,
      quantity: parseFloat(quantity),
      unit: selectedProduct.unit,
      pricePerUnit: selectedProduct.averagePrice,
    };

    setItems([...items, newItem]);
    setSelectedProduct(null);
    setQuantity("");
    setShowProductDropdown(false);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);
  };

  const handleCreateInvoice = async () => {
    if (items.length === 0) {
      Alert.alert("Error", "Please add at least one item to the invoice");
      return;
    }

    try {
      const today = new Date().toISOString().split("T")[0];
      
      await createInvoice({
        date: today,
        dueDate,
        farmer: {
          id: selectedFarmer.id,
          name: selectedFarmer.name,
          location: selectedFarmer.location,
          phone: selectedFarmer.phone,
        },
        buyer: {
          id: selectedBuyer.id,
          name: selectedBuyer.name,
          location: selectedBuyer.location,
        },
        items,
        status: "pending",
        totalAmount: calculateTotal(),
        currency: "ZMW",
      });

      Alert.alert(
        "Success",
        "Invoice created successfully",
        [{ text: "OK", onPress: () => router.push("/invoices") }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to create invoice. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Invoice</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parties</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farmer (From)</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowFarmerDropdown(!showFarmerDropdown)}
            >
              <Text style={styles.dropdownText}>{selectedFarmer.name}</Text>
              <ChevronDown size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            {showFarmerDropdown && (
              <View style={styles.dropdownMenu}>
                {mockFarmers.map((farmer) => (
                  <TouchableOpacity
                    key={farmer.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedFarmer(farmer);
                      setShowFarmerDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{farmer.name}</Text>
                    <Text style={styles.dropdownItemSubtext}>{farmer.location}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Buyer (To)</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowBuyerDropdown(!showBuyerDropdown)}
            >
              <Text style={styles.dropdownText}>{selectedBuyer.name}</Text>
              <ChevronDown size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            {showBuyerDropdown && (
              <View style={styles.dropdownMenu}>
                {mockBuyers.map((buyer) => (
                  <TouchableOpacity
                    key={buyer.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedBuyer(buyer);
                      setShowBuyerDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{buyer.name}</Text>
                    <Text style={styles.dropdownItemSubtext}>{buyer.location}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Due Date</Text>
            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.quantity} {item.unit} × ZMW {item.pricePerUnit.toFixed(2)}
                </Text>
              </View>
              <View style={styles.itemActions}>
                <Text style={styles.itemTotal}>
                  ZMW {(item.quantity * item.pricePerUnit).toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Trash2 size={18} color={Colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <View style={styles.addItemContainer}>
            <View style={styles.addItemRow}>
              <View style={styles.productDropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowProductDropdown(!showProductDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedProduct ? selectedProduct.name : "Select Product"}
                  </Text>
                  <ChevronDown size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
                
                {showProductDropdown && (
                  <View style={styles.dropdownMenu}>
                    {mockProducts.map((product) => (
                      <TouchableOpacity
                        key={product.id}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedProduct(product);
                          setShowProductDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{product.name}</Text>
                        <Text style={styles.dropdownItemSubtext}>
                          ZMW {product.averagePrice.toFixed(2)} per {product.unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              
              <View style={styles.quantityContainer}>
                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Qty"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Plus size={20} color={Colors.background} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>ZMW {calculateTotal().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Create Invoice"
            onPress={handleCreateInvoice}
            variant="primary"
            size="large"
            loading={isLoading}
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  dropdown: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text,
  },
  dropdownMenu: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginRight: 12,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.error + "10",
    alignItems: "center",
    justifyContent: "center",
  },
  addItemContainer: {
    marginTop: 16,
  },
  addItemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  productDropdownContainer: {
    flex: 2,
    marginRight: 8,
  },
  quantityContainer: {
    flex: 1,
    marginRight: 8,
  },
  quantityInput: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});
