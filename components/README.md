# Components - Atomic Design Structure

This project follows the **Atomic Design** methodology for organizing components. This approach helps maintain a scalable and maintainable component architecture.

## 📁 Structure

```
components/
├── atoms/           # Smallest building blocks
├── molecules/       # Combinations of atoms
├── organisms/       # Complex UI components
├── templates/       # Page layouts and structures
└── ui/             # Base UI components (shadcn/ui)
```

## 🔬 Atomic Design Levels

### Atoms (`/atoms`)

**Smallest, indivisible components** - Cannot be broken down further without losing functionality.

- `IconLine` - Decorative line with icon
- `CountUp` - Animated number counter
- `ValueCounter` - Value display with counter animation

**Usage:**

```tsx
import { IconLine, CountUp, ValueCounter } from "@/components/atoms";
```

---

### Molecules (`/molecules`)

**Simple combinations of atoms** - Groups of atoms functioning together as a unit.

- `ProductCard` - Product display card
- `CategoryFilterSkeleton` - Loading skeleton for category filter
- `ProductsGridSkeleton` - Loading skeleton for products grid
- `OurProductsSkeleton` - Loading skeleton for products section
- `ProductDetailSkeleton` - Loading skeleton for product details
- `LocaleSwitcher` - Language selection dropdown
- `ShowProductsDropdown` - Products per page selector
- `SortByDropdown` - Sort options dropdown
- `CollectionsDropdown` - Collections navigation dropdown
- `SearchModal` - Search functionality modal
- `DynamicBreadcrumb` - Dynamic breadcrumb navigation

**Usage:**

```tsx
import {
  ProductCard,
  SortByDropdown,
  DynamicBreadcrumb,
} from "@/components/molecules";
```

---

### Organisms (`/organisms`)

**Complex UI components** - Groups of molecules and/or atoms that form distinct sections.

#### Navigation & Layout

- `Navbar` - Main navigation bar
- `Footer` - Site footer

#### Sections

- `HeroSection` - Hero/banner section
- `AboutSection` - About company section
- `ContactSection` - Contact information section
- `CounterSection` - Statistics counter section

#### Product Features

- `CategoryFilter` - Product category filtering
- `CategoryFilterClient` - Client-side category filter wrapper
- `CollectionsClientWrapper` - Collections page wrapper with filters
- `PaginationClient` - Client-side pagination
- `ProductsList` - List of products
- `RelatedProducts` - Related products section
- `ProductsGridClient` - Products grid with client features

#### Forms

- `ContactForm` - Contact submission form
- `AppointmentForm` - Appointment booking form
- `AppointmentCalendar` - Calendar for appointments

#### Content

- `Faq` - Frequently asked questions
- `Gallery` - Image gallery
- `GalleryLightbox` - Lightbox for gallery images
- `Map` - Location map
- `Branches` - Branch locations
- `VisionMision` - Vision and mission section
- `UniqueSellingPoints` - USP highlights
- `OurServices` - Services offered section
- `InfoSection` - General information section

**Usage:**

```tsx
import {
  Navbar,
  Footer,
  ProductsList,
  ContactForm,
} from "@/components/organisms";
```

---

### Templates (`/templates`)

**Page-level layouts** - Complete page structures combining organisms.

- `DynamicHero` - Dynamic hero section template
- `HeaderBetween` - Header with content between
- `Banner` - Banner section template
- `OurProducts` - Products showcase template
- `OurCollections` - Collections showcase template
- `AppointmentSection` - Appointment booking section template

**Usage:**

```tsx
import { DynamicHero, OurProducts, Banner } from "@/components/templates";
```

---

### UI Components (`/ui`)

**Base components from shadcn/ui** - Reusable UI primitives.

- `accordion` - Accordion/collapse component
- `breadcrumb` - Breadcrumb navigation
- `button` - Button component
- `card` - Card container
- `pagination` - Pagination controls
- `skeleton` - Loading skeleton

**Usage:**

```tsx
import { Button, Card, Skeleton } from "@/components/ui";
```

---

## 🎯 Import Strategy

### Individual Import (Recommended for tree-shaking)

```tsx
import ProductCard from "@/components/molecules/ProductCard";
import Navbar from "@/components/organisms/Navbar";
```

### Grouped Import (Convenient for multiple imports)

```tsx
import { ProductCard, SortByDropdown } from "@/components/molecules";
import { Navbar, Footer, ContactForm } from "@/components/organisms";
```

### All-in-one Import (Not recommended - larger bundle size)

```tsx
import { ProductCard, Navbar, Footer } from "@/components";
```

---

## 📝 Guidelines

### When to Create Each Type

#### Atoms

- ✅ Single purpose, no dependencies on other components
- ✅ Highly reusable across the entire app
- ✅ No business logic
- ❌ Cannot be split into smaller components

#### Molecules

- ✅ Combination of 2+ atoms
- ✅ Single responsibility
- ✅ Reusable in multiple contexts
- ❌ No complex state management

#### Organisms

- ✅ Complex functionality
- ✅ May contain business logic
- ✅ Can have internal state
- ✅ Specific to certain features

#### Templates

- ✅ Define page structure
- ✅ Combine multiple organisms
- ✅ Handle layout and spacing
- ❌ No business logic (pass data via props)

---

## 🔄 Migration Notes

All components have been organized into their respective atomic design categories. Import paths have been updated throughout the application to reflect this new structure.

### Breaking Changes

- Import paths have changed from `@/components/[ComponentName]` to `@/components/[level]/[ComponentName]`
- Barrel exports are available for convenience: `@/components/[level]`

---

## 🚀 Benefits

1. **Better Organization** - Clear hierarchy and responsibility
2. **Improved Reusability** - Easy to identify reusable components
3. **Scalability** - Easy to add new components
4. **Team Collaboration** - Clear guidelines for all developers
5. **Maintainability** - Easier to locate and update components

---

## 📚 Further Reading

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Component Design Patterns](https://www.patterns.dev/posts/presentational-container-pattern/)
