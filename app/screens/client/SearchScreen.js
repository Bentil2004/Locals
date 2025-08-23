import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserDetails } from "../../hooks/useUserDetails";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import debounce from 'lodash.debounce';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { user, profile, loading, logout } = useUserDetails();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ['All', 'Plumbing', 'Electrical', 'Carpentry', 'Tailoring', 'Painting', 'Others'];

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile?.avatar]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        const providersRef = collection(db, "users");
        const q = query(
          providersRef, 
          where("role", "==", "provider"),
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const providersData = [];
          querySnapshot.forEach((doc) => {
            const providerData = doc.data();
            providersData.push({
              id: doc.id,
              name: providerData.name,
              avatar: providerData.avatar || "https://i.pravatar.cc/150",
              service: providerData.service || "Service Provider",
              serviceCategory: providerData.serviceCategory || "others",
              rating: providerData.rating || "4.8",
              distance: providerData.distance || "0.8km",
              phone: providerData.phone || "",
              email: providerData.email || ""
            });
          });
          setProviders(providersData);
          setFilteredProviders(providersData);
          setIsLoading(false);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Error fetching providers:", error);
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query, category, providersList) => {
      let filtered = providersList;

      if (category !== "All") {
        filtered = filtered.filter(provider => 
          provider.serviceCategory?.toLowerCase() === category.toLowerCase()
        );
      }

      if (query && query.trim() !== "") {
        const searchTerm = query.toLowerCase().trim();
        filtered = filtered.filter(provider => 
          provider.name?.toLowerCase().includes(searchTerm) || 
          provider.service?.toLowerCase().includes(searchTerm) ||
          provider.serviceCategory?.toLowerCase().includes(searchTerm)
        );
      }
      
      setFilteredProviders(filtered);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory, providers);
  }, [searchQuery, selectedCategory, providers, debouncedSearch]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Search Screen</Text>
          <Text style={styles.welcomeSubtext}>Search for service providers</Text>
        </View>
        <Image
          source={{ uri: profileImage}}
          style={styles.profileImage}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for services and providers"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchChange}
            returnKeyType="search"
            // clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isLoading ? (
          <ActivityIndicator size="medium" color="#159D73" style={styles.loader} />
        ) : (
          <>
            <Text style={styles.resultsText}>
              Showing {filteredProviders.length} result{filteredProviders.length !== 1 ? 's' : ''}
              {searchQuery ? ` for "${searchQuery}"` : ''}
              {selectedCategory !== "All" ? ` in ${selectedCategory}` : ''}
            </Text>

            {filteredProviders.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-off" size={50} color="#999" />
                <Text style={styles.noResultsText}>No providers found</Text>
                <Text style={styles.noResultsSubtext}>
                  {searchQuery || selectedCategory !== "All" 
                    ? "Try a different search term or category" 
                    : "No service providers available at the moment"}
                </Text>
              </View>
            ) : (
              filteredProviders.map((provider, index) => (
                <View key={index} style={styles.providerCard}>
                  <View style={styles.providerInfo}>
                    <Image
                      source={{ uri: provider.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.providerDetails}>
                      <Text style={styles.providerName}>{provider.name}</Text>
                      <Text style={styles.providerService}>{provider.service}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{provider.rating}</Text>
                      </View>
                      <Text style={styles.providerDistance}>{provider.distance} away</Text>
                    </View>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.messageButton}
                      onPress={() => navigation.navigate('ChatScreen', { 
                        providerId: provider.id,
                        providerName: provider.name,
                        providerService: provider.service,
                        providerImage: provider.avatar
                      })}
                    >
                      <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={() => {
                        navigation.navigate('ProviderProfile',{
                          providerId: provider.id,
                          provider: {
                            id: provider.id,
                            name: provider.name,
                            service: provider.service,
                            avatar: provider.avatar,
                            phone: provider.phone,
                            email: provider.email,
                            rating: provider.rating,
                            distance: provider.distance,
                            serviceCategory: provider.serviceCategory
                          }
                        });
                      }}
                    >
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: "#159D73",
    borderBottomRightRadius: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130
  },
  welcomeText: { 
    fontSize: 24,
    fontWeight: "bold", 
    color: "#fff" 
  },
  welcomeSubtext: { 
    fontSize: 18, 
    color: "#f0f0f0"
  },
  profileImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategoryItem: {
    backgroundColor: '#159D73',
    borderColor: '#159D73',
  },
  categoryText: {
    color: '#444',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultsText: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
  },
  providerService: {
    color: '#0496FF',
    fontSize: 14,
    marginBottom: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  providerDistance: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: '#159D73',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  messageButtonText: {
    color: '#159D73',
    textAlign: 'center',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#159D73',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  loader: {
    marginVertical: 40,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: '500',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default SearchScreen;