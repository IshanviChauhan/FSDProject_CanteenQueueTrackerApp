import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useMenuItems } from '../hooks/useMenuItems';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const MenuPage = () => {
  const { menuItems, categories, isLoading, error } = useMenuItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter menu items based on search query and selected category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };
  
  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-error-600">Error loading menu items. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
        <p className="text-gray-600 mt-2">Browse our delicious offerings and place your order</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search menu..."
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={<Search size={18} />}
            fullWidth
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<Filter size={18} />}
          >
            Filters
          </Button>
          
          {(searchQuery || selectedCategory) && (
            <Button 
              variant="ghost" 
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="flex flex-wrap gap-2 animate-slide-down">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryClick(category)}
            >
              {formatCategoryName(category)}
            </Button>
          ))}
        </div>
      )}
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No menu items match your filters. Try clearing your search or selecting a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};