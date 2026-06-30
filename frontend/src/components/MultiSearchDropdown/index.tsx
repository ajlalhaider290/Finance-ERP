import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, X, ChevronDown, Loader2, AlertCircle, icons } from 'lucide-react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useDebounce } from '@/hooks/useDebounce';
import { AxiosResponse } from 'axios';

export interface MultiSearchOption {
  value: string | number;
  label: string;
  color?: string;
  icon?: string;
}

const OptionDecoration: React.FC<{ color?: string; icon?: string }> = ({ color, icon }) => {
  const Icon = icon ? icons[icon as keyof typeof icons] : undefined;
  if (Icon) return <Icon className="size-3.5 shrink-0" style={color ? { color } : undefined} />;
  if (color) return <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />;
  return null;
};

interface MultiSearchDropdownProps {
  options?: MultiSearchOption[];
  fetchData?: (page: number, limit: number, search?: string) => Promise<AxiosResponse<MultiSearchOption[], unknown>>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  maxDisplay?: number;
  pageSize?: number;
  minSearchLength?: number;
  initialOptions?: MultiSearchOption[];
  showBadges?: boolean;
  debounceDelay?: number;
  disabled?: boolean;
  clearable?: boolean;
  errorMessage?: string;
}

export const MultiSearchDropdown: React.FC<MultiSearchDropdownProps> = ({
  options,
  fetchData,
  selectedValues = [],
  onChange,
  placeholder = 'Select options...',
  label,
  searchPlaceholder = 'Search options...',
  maxDisplay = 3,
  pageSize = 20,
  minSearchLength = 0,
  initialOptions,
  showBadges = true,
  debounceDelay = 400,
  disabled = false,
  clearable = true,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isDynamic = !!fetchData;

  // Reset search term when popover closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  // -- Selected options cache for dynamic mode --
  const [selectedOptionsCache, setSelectedOptionsCache] = useState<Map<string, MultiSearchOption>>(() => {
    if (initialOptions && initialOptions.length > 0) {
      const map = new Map<string, MultiSearchOption>();
      for (const opt of initialOptions) {
        map.set(opt.value.toString(), { value: opt.value.toString(), label: opt.label, color: opt.color, icon: opt.icon });
      }
      return map;
    }
    return new Map();
  });
  const initialOptionsSeedRef = useRef(false);

  useEffect(() => {
    if (initialOptionsSeedRef.current || !initialOptions || initialOptions.length === 0) return;
    initialOptionsSeedRef.current = true;
    setSelectedOptionsCache((prev) => {
      const next = new Map(prev);
      for (const opt of initialOptions) {
        next.set(opt.value.toString(), { value: opt.value.toString(), label: opt.label, color: opt.color, icon: opt.icon });
      }
      return next;
    });
  }, [initialOptions]);

  const currentSelectedValues = useMemo(() => (Array.isArray(selectedValues) ? selectedValues : []), [selectedValues]);

  // -- Dynamic mode: infinite scroll setup --
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const [viewportEl, setViewportEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !isDynamic) {
      setViewportEl(null);
      return;
    }

    const id = requestAnimationFrame(() => {
      const root = scrollAreaRootRef.current;
      if (!root) return;
      const vp = root.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]');
      setViewportEl(vp || null);
    });

    return () => cancelAnimationFrame(id);
  }, [isOpen, isDynamic]);

  const scrollContainerRef = useMemo(() => ({ current: viewportEl }) as React.RefObject<HTMLElement | null>, [viewportEl]);

  const effectiveSearch = debouncedSearchTerm.length >= minSearchLength ? debouncedSearchTerm : '';

  const searchAwareFetch = useCallback((page: number, limit: number) => fetchData!(page, limit, effectiveSearch), [fetchData, effectiveSearch]);

  const meetsSearchRequirement = minSearchLength === 0 || debouncedSearchTerm.length >= minSearchLength;

  const noopFetch = useCallback(() => Promise.resolve({ data: [] } as unknown as AxiosResponse<MultiSearchOption[], unknown>), []);

  const {
    data: fetchedData,
    loading,
    hasMore,
    error,
    reset,
  } = useInfiniteScroll<MultiSearchOption>({
    fetchData: isDynamic ? searchAwareFetch : noopFetch,
    initialPage: 0,
    limit: pageSize,
    scrollContainer: scrollContainerRef,
    threshold: 100,
    enabled: isDynamic && !!viewportEl && meetsSearchRequirement,
  });

  useEffect(() => {
    if (isDynamic) {
      reset();
    }
  }, [effectiveSearch, reset, isDynamic]);

  // Cache fetched options that are selected so badges display correctly
  useEffect(() => {
    if (!isDynamic || fetchedData.length === 0) return;
    setSelectedOptionsCache((prev) => {
      const next = new Map(prev);
      for (const opt of fetchedData) {
        const val = opt.value.toString();
        if (currentSelectedValues.includes(val)) {
          next.set(val, { value: val, label: opt.label, color: opt.color, icon: opt.icon });
        }
      }
      return next;
    });
  }, [fetchedData, currentSelectedValues, isDynamic]);

  // -- Memoized display options --
  const displayOptions: MultiSearchOption[] = useMemo(() => {
    if (isDynamic) {
      if (!meetsSearchRequirement) {
        return (initialOptions || []).filter((o) => currentSelectedValues.includes(o.value.toString()));
      }
      return fetchedData.map((o) => ({ value: o.value.toString(), label: o.label, color: o.color, icon: o.icon }));
    }
    return (options || []).filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [isDynamic, meetsSearchRequirement, initialOptions, currentSelectedValues, fetchedData, options, searchTerm]);

  // Selected options for badges
  const selectedOptions: MultiSearchOption[] = useMemo(() => {
    if (isDynamic) {
      return currentSelectedValues.map((val) => selectedOptionsCache.get(val)).filter((opt): opt is MultiSearchOption => !!opt);
    }
    return (options || []).filter((option) => currentSelectedValues.includes(option.value.toString()));
  }, [isDynamic, currentSelectedValues, selectedOptionsCache, options]);

  // -- Memoized handlers --
  const handleToggle = useCallback(
    (value: string | number) => {
      const stringVal = value.toString();
      const isSelected = currentSelectedValues.includes(stringVal);
      const newValues = isSelected ? currentSelectedValues.filter((v) => v !== stringVal) : [...currentSelectedValues, stringVal];
      onChange(newValues);

      if (isDynamic) {
        if (!isSelected) {
          // Cache the option when selecting
          const opt = fetchedData.find((o) => o.value.toString() === stringVal);
          if (opt) {
            setSelectedOptionsCache((prev) => {
              const next = new Map(prev);
              next.set(stringVal, { value: stringVal, label: opt.label, color: opt.color, icon: opt.icon });
              return next;
            });
          }
        } else {
          // Remove from cache when deselecting
          setSelectedOptionsCache((prev) => {
            const next = new Map(prev);
            next.delete(stringVal);
            return next;
          });
        }
      }
    },
    [currentSelectedValues, onChange, isDynamic, fetchedData],
  );

  const handleRemove = useCallback(
    (value: string | number) => {
      const stringVal = value.toString();
      onChange(currentSelectedValues.filter((v) => v !== stringVal));
      if (isDynamic) {
        setSelectedOptionsCache((prev) => {
          const next = new Map(prev);
          next.delete(stringVal);
          return next;
        });
      }
    },
    [currentSelectedValues, onChange, isDynamic],
  );

  const clearAll = useCallback(() => {
    onChange([]);
    if (isDynamic) {
      setSelectedOptionsCache(new Map());
    }
  }, [onChange, isDynamic]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // -- Memoized display text --
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length <= maxDisplay) {
      return selectedOptions.map((opt) => opt.label).join(', ');
    }
    return `${selectedOptions
      .slice(0, maxDisplay)
      .map((opt) => opt.label)
      .join(', ')} +${selectedOptions.length - maxDisplay} more`;
  }, [selectedOptions, placeholder, maxDisplay]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={label || placeholder}
            className="w-full justify-between text-left font-normal"
            disabled={disabled}>
            <span className="truncate">{displayText}</span>
            <div className="flex items-center gap-2">
              {currentSelectedValues.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {currentSelectedValues.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                role="searchbox"
                aria-label="Search options"
              />
            </div>
          </div>

          {isDynamic ? (
            <ScrollArea className="h-60" ref={scrollAreaRootRef}>
              <div className="p-1" role="listbox">
                {error ? (
                  <div className="p-3 text-sm text-destructive text-center flex flex-col items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{errorMessage || error.message || 'Failed to load options'}</span>
                    <Button variant="outline" size="sm" onClick={() => reset()} className="mt-2">
                      Try Again
                    </Button>
                  </div>
                ) : !meetsSearchRequirement && displayOptions.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground text-center">Type at least {minSearchLength} characters to search</div>
                ) : displayOptions.length === 0 && !loading ? (
                  <div className="p-3 text-sm text-muted-foreground text-center">No options found</div>
                ) : (
                  <>
                    {displayOptions.map((option) => (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={currentSelectedValues.includes(option.value.toString())}
                        tabIndex={0}
                        className="flex items-center space-x-2 p-3 hover:bg-accent cursor-pointer rounded-sm focus:bg-accent focus:outline-none"
                        onClick={() => handleToggle(option.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggle(option.value);
                          }
                        }}>
                        <Checkbox checked={currentSelectedValues.includes(option.value.toString())} onChange={() => handleToggle(option.value)} />
                        <OptionDecoration color={option.color} icon={option.icon} />
                        <label className="text-sm cursor-pointer flex-1">{option.label}</label>
                      </div>
                    ))}
                    {loading && hasMore && (
                      <div className="flex items-center justify-center p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {!hasMore && displayOptions.length > 0 && <div className="p-3 text-xs text-muted-foreground text-center">All options loaded</div>}
                  </>
                )}
              </div>
            </ScrollArea>
          ) : (
            <div className="max-h-60 overflow-auto" role="listbox">
              {displayOptions.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground text-center">No options found</div>
              ) : (
                displayOptions.map((option) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={currentSelectedValues.includes(option.value.toString())}
                    tabIndex={0}
                    className="flex items-center space-x-2 p-3 hover:bg-accent cursor-pointer rounded-sm focus:bg-accent focus:outline-none"
                    onClick={() => handleToggle(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle(option.value);
                      }
                    }}>
                    <Checkbox checked={currentSelectedValues.includes(option.value.toString())} onChange={() => handleToggle(option.value)} />
                    <OptionDecoration color={option.color} icon={option.icon} />
                    <label className="text-sm cursor-pointer flex-1">{option.label}</label>
                  </div>
                ))
              )}
            </div>
          )}

          {clearable && currentSelectedValues.length > 0 && (
            <div className="p-3 border-t">
              <Button variant="outline" size="sm" onClick={clearAll} className="w-full">
                Clear All
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {showBadges && currentSelectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedOptions.map((option) => (
            <Badge key={option.value} variant="secondary" className="text-xs px-2 py-1 flex items-center gap-1">
              <OptionDecoration color={option.color} icon={option.icon} />
              {option.label}
              <span
                role="button"
                tabIndex={0}
                className="ml-1 cursor-pointer hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(option.value);
                  }
                }}>
                <X className="h-3 w-3 pointer-events-auto" />
              </span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
