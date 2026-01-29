# Component Size and Responsibility
```tsx
// BAD: One large component doing everything
function UserProfile() {
  return (
    <div>
      <img src={avatar} />
      <h1>{name}</h1>
      <p>{email}</p>
      <button onClick={handleEdit}>Edit</button>
      <div>
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span>{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// GOOD: Separated into focused components
function UserProfile() {
  return (
    <div>
      <UserHeader />
      <UserPosts />
    </div>
  );
}

function UserHeader() {
  return (
    <header>
      <UserAvatar />
      <UserInfo />
      <UserActions />
    </header>
  );
}

function UserPosts() {
  return (
    <section>
      <PostsList posts={posts} />
    </section>
  );
}
```

# JSX Semantics
```tsx
// BAD: Non-semantic, unclear structure
function Page() {
  return (
    <div>
      <div>
        <div>Logo</div>
        <div>Menu</div>
      </div>
      <div>
        <div>Content here</div>
      </div>
    </div>
  );
}

// GOOD: Semantic, clear structure
function Page() {
  return (
    <div>
      <Header>
        <Logo />
        <Navigation />
      </Header>
      <Main>
        <Content />
      </Main>
    </div>
  );
}
```

# Design Tokens Usage
```tsx
// BAD: Hardcoded values
function Card() {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      className="bg-[#ffffff]"
    >
      Content
    </div>
  );
}

// GOOD: Using Tailwind classes with design tokens
function Card() {
  return (
    <div className="bg-primary p-md rounded-md shadow-sm">
      Content
    </div>
  );
}
```

## Code Reusability
```tsx
function UserProfile({ userId }: { userId: string }) {
  const { user, loading } = useUserDataQuery(userId); // React Query hook.

  if (loading) return <LoadingSpinner />;
  if (!user) return <UserNotFound />;

  return (
    <div>
      <UserHeader user={user} />
      <UserContent user={user} />
    </div>
  );
}
```