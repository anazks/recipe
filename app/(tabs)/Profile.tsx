import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    memberSince: 'January 2023',
    avatar: '👨‍🍳',
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSave: true,
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(user);

  const profileStats = [
    { label: 'Recipes Created', value: '47', icon: '📝' },
    { label: 'Favorites', value: '23', icon: '❤️' },
    { label: 'Shopping Lists', value: '12', icon: '🛒' },
    { label: 'Reviews', value: '89', icon: '⭐' },
  ];

  const menuItems = [
    { id: 1, title: 'My Recipes', icon: '📖', action: 'recipes' },
    { id: 2, title: 'Favorite Recipes', icon: '❤️', action: 'favorites' },
    { id: 3, title: 'Shopping Lists', icon: '🛒', action: 'shopping' },
    { id: 4, title: 'Meal Plans', icon: '📅', action: 'meals' },
    { id: 5, title: 'Dietary Preferences', icon: '🥗', action: 'diet' },
    { id: 6, title: 'Kitchen Tools', icon: '🔪', action: 'tools' },
  ];

  const accountItems = [
    { id: 1, title: 'Privacy Settings', icon: '🔒', action: 'privacy' },
    { id: 2, title: 'Help & Support', icon: '❓', action: 'help' },
    { id: 3, title: 'About', icon: 'ℹ️', action: 'about' },
    { id: 4, title: 'Rate App', icon: '⭐', action: 'rate' },
    { id: 5, title: 'Share App', icon: '📤', action: 'share' },
  ];

  const handleMenuPress = (action) => {
    Alert.alert('Feature', `${action} feature coming soon!`);
  };

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleEditProfile = () => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    setUser(editingUser);
    setIsEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const StatCard = ({ stat }) => (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{stat.icon}</Text>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const MenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleMenuPress(item.action)}
    >
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  const SettingItem = ({ title, icon, setting, value }) => (
    <View style={styles.settingItem}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={() => handleSettingToggle(setting)}
        trackColor={{ false: '#ddd', true: '#ff8c00' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.avatar}</Text>
            <View style={styles.onlineBadge} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userLocation}>📍 {user.location}</Text>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Kitchen</Text>
          <View style={styles.menuContainer}>
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            <SettingItem
              title="Push Notifications"
              icon="🔔"
              setting="notifications"
              value={settings.notifications}
            />
            <SettingItem
              title="Email Updates"
              icon="📧"
              setting="emailUpdates"
              value={settings.emailUpdates}
            />
            <SettingItem
              title="Dark Mode"
              icon="🌙"
              setting="darkMode"
              value={settings.darkMode}
            />
            <SettingItem
              title="Auto-save Recipes"
              icon="💾"
              setting="autoSave"
              value={settings.autoSave}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {accountItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.avatarEditContainer}>
              <Text style={styles.avatarEdit}>{editingUser.avatar}</Text>
              <TouchableOpacity style={styles.avatarChangeButton}>
                <Text style={styles.avatarChangeText}>Change Avatar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={editingUser.name}
                onChangeText={(text) => setEditingUser(prev => ({ ...prev, name: text }))}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={editingUser.email}
                onChangeText={(text) => setEditingUser(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.textInput}
                value={editingUser.phone}
                onChangeText={(text) => setEditingUser(prev => ({ ...prev, phone: text }))}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={editingUser.location}
                onChangeText={(text) => setEditingUser(prev => ({ ...prev, location: text }))}
                placeholder="Enter your location"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    fontSize: 16,
    color: '#ff8c00',
    fontWeight: '600',
  },

  // Profile Card Styles
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 80,
    textAlign: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 12,
    color: '#aaa',
  },

  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  // Section Styles
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Menu Item Styles
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: '#ccc',
  },

  // Setting Item Styles
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  // Logout Styles
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSave: {
    fontSize: 16,
    color: '#ff8c00',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  avatarEditContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarEdit: {
    fontSize: 80,
    marginBottom: 15,
  },
  avatarChangeButton: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  avatarChangeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },

  bottomSpacing: {
    height: 30,
  },
});