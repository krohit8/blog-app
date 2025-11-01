import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props{
    children :ReactNode;
    fallback? : ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State{
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            hasError:false,
            error: null
        }
    }
    static getDerivedStateFromError(error: Error): State{
        return {
            hasError: true,
            error
        }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("ErrorBoundary caught an error:",error, errorInfo)
        if(this.props.onError){
            this.props.onError(error,errorInfo)
        }
        // TODO: add sentry 
    }
    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
        })
    }
    render(){
        if(this.state.hasError){
            if(this.props.fallback){
                return this.props.fallback
            }
            
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                  <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                      Oops! Something went wrong
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      We're sorry for the inconvenience. The error has been reported to our team.
                    </p>
                    {process.env.NODE_ENV === "development" && this.state.error && (
                        <details className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded">
                          <summary className="cursor-pointer font-medium">
                            Error Details (Dev Only)
                          </summary>
                          <pre className="mt-2 whitespace-pre-wrap break-words">
                            {this.state.error.toString()}
                          </pre>
                        </details>
                      )}
          

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={this.resetError}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                        >
                          Try Again
                        </button>
                        <button
                          onClick={() => (window.location.href = "/")}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                        >
                          Go Home
                        </button>
                      </div>
                    </div>
                  </div>
            );
        }
        
        return this.props.children;
    }
}