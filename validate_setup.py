"""
Setup Validation Script
Run this to verify your installation is correct
"""
import sys
import os
from pathlib import Path

def check_python_version():
    """Check Python version"""
    print("1️⃣  Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"   ✅ Python {version.major}.{version.minor} (OK)\n")
        return True
    else:
        print(f"   ❌ Python {version.major}.{version.minor} (Need 3.8+)\n")
        return False

def check_dependencies():
    """Check if required packages are installed"""
    print("2️⃣  Checking dependencies...")
    required = [
        'anthropic',
        'google',
        'openai',
        'dotenv',
        'PyPDF2',
        'colorama'
    ]
    
    missing = []
    for package in required:
        try:
            __import__(package)
            print(f"   ✅ {package}")
        except ImportError:
            print(f"   ❌ {package} (MISSING)")
            missing.append(package)
    
    if missing:
        print(f"\n   Install with: pip install {' '.join(missing)}\n")
        return False
    print()
    return True

def check_env_file():
    """Check if .env file exists"""
    print("3️⃣  Checking environment configuration...")
    if os.path.exists('.env'):
        print("   ✅ .env file found")
        # Check if has any API keys
        with open('.env', 'r') as f:
            content = f.read()
            if 'API_KEY=' in content:
                print("   ✅ API key appears to be configured\n")
                return True
            else:
                print("   ⚠️  .env file exists but may be empty\n")
                return False
    else:
        print("   ❌ .env file not found")
        print("   Create it with: cp .env.example .env\n")
        return False

def check_local_files():
    """Check if all required files exist"""
    print("4️⃣  Checking project files...")
    required_files = [
        'main.py',
        'agent.py',
        'llm_provider.py',
        'config.py',
        'utils.py',
        'requirements.txt',
        '.env.example'
    ]
    
    missing = []
    for file in required_files:
        if os.path.exists(file):
            size = os.path.getsize(file)
            print(f"   ✅ {file} ({size} bytes)")
        else:
            print(f"   ❌ {file} (MISSING)")
            missing.append(file)
    
    if missing:
        print(f"\n   Missing files: {', '.join(missing)}\n")
        return False
    print()
    return True

def check_imports():
    """Try importing our modules"""
    print("5️⃣  Checking module imports...")
    try:
        import config
        print("   ✅ config module")
    except ImportError as e:
        print(f"   ❌ config module: {e}")
        return False
    
    try:
        import utils
        print("   ✅ utils module")
    except ImportError as e:
        print(f"   ❌ utils module: {e}")
        return False
    
    try:
        import llm_provider
        print("   ✅ llm_provider module")
    except ImportError as e:
        print(f"   ❌ llm_provider module: {e}")
        return False
    
    try:
        import agent
        print("   ✅ agent module")
    except ImportError as e:
        print(f"   ❌ agent module: {e}")
        return False
    
    print()
    return True

def main():
    """Run all checks"""
    print("\n" + "="*60)
    print("🔍 Job Search AI Agent - Setup Verification")
    print("="*60 + "\n")
    
    results = []
    results.append(("Python Version", check_python_version()))
    results.append(("Dependencies", check_dependencies()))
    results.append(("Environment", check_env_file()))
    results.append(("Project Files", check_local_files()))
    results.append(("Module Imports", check_imports()))
    
    # Summary
    print("="*60)
    print("📋 Verification Summary")
    print("="*60 + "\n")
    
    all_passed = True
    for name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {name}")
        if not passed:
            all_passed = False
    
    print("\n" + "="*60)
    
    if all_passed:
        print("🎉 All checks passed! You're ready to go!")
        print("\nRun the agent with:")
        print("   python main.py")
        print("="*60 + "\n")
        return 0
    else:
        print("⚠️  Some checks failed. See errors above.")
        print("\nCommon fixes:")
        print("  1. Install dependencies: pip install -r requirements.txt")
        print("  2. Create .env file: cp .env.example .env")
        print("  3. Add API key to .env")
        print("="*60 + "\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
