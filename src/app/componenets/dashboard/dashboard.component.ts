import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'all';
  selectedProduct: any = null;
  // Form fields
  isEditMode: boolean = false;
  productForm: any = {
    id: null,
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  };

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }
  searchTerm: string = '';  // Bind this to the search input field

// Filter the products based on the search term
// filteredProducts() {
//   return this.products.filter(product =>
//     product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//   );
// }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
    if (this.searchTerm!=''){
      this.filteredProducts=this.filteredProducts.filter(product=>product.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  }

  openModal(product: any): void {
    this.selectedProduct = product;
  }

viewProduct(product: any) {
  this.selectedProduct = product;
}


  closeModal(): void {
    this.selectedProduct = null;
    this.isEditMode = false;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.productForm = {
      id: null,
      title: '',
      price: '',
      category: '',
      description: '',
      image: ''
    };
    this.selectedProduct = {};
  }

  editProduct(product: any): void {
    this.isEditMode = true;
    this.productForm = { ...product };
    this.selectedProduct = {};
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productForm.id, this.productForm).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  // Optionally, delete from the server if your service has delete API
  this.productService.deleteProduct(id).subscribe(() => {
    console.log(`Product with ID ${id} deleted.`);
  });
    
  }
}
